export type ContactValues = {
  name: string;
  phone: string;
  businessType: string;
  requirement: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

/**
 * Strips control characters and angle brackets, collapses runs of whitespace,
 * and caps length. Applied to every field before the value leaves the browser,
 * so nothing a visitor types can be smuggled into a message or a mailto link.
 *
 * `multiline` keeps line breaks (at most one blank line in a row), for the
 * free-text requirement where a visitor may well write a short list.
 */
export function sanitize(value: string, maxLength = 1200, { multiline = false } = {}): string {
  let out = '';
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isControl = code < 32 || code === 127;
    if (multiline && char === '\n') {
      out += '\n';
    } else if (isControl) {
      out += ' ';
    } else if (char !== '<' && char !== '>') {
      out += char;
    }
  }

  const collapsed = multiline
    ? out
        .replace(/[^\S\n]+/g, ' ')
        .replace(/ *\n */g, '\n')
        .replace(/\n{3,}/g, '\n\n')
    : out.replace(/\s{2,}/g, ' ');

  return collapsed.trim().slice(0, maxLength);
}

/**
 * Accepts 10-digit Indian mobile numbers, with or without +91, a trunk `0`
 * (`09876543210`, how many people still write it), and any spacing.
 */
export function normalisePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  const local =
    digits.startsWith('91') && digits.length === 12
      ? digits.slice(2)
      : digits.startsWith('0') && digits.length === 11
        ? digits.slice(1)
        : digits;
  if (local.length !== 10) return null;
  if (!/^[6-9]/.test(local)) return null;
  return local;
}

/** Field-level validation with messages written the way a person would say them. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  const name = values.name.trim();
  if (name.length === 0) {
    errors.name = 'Please tell me your name.';
  } else if (name.length < 2) {
    errors.name = 'That looks a bit short — please enter your full name.';
  } else if (name.length > 80) {
    errors.name = 'Please keep your name under 80 characters.';
  }

  // Optional: WhatsApp already shows me the number a message comes from. It is
  // only needed when the visitor would rather be called on a different one.
  if (values.phone.trim().length > 0 && !normalisePhone(values.phone)) {
    errors.phone = 'Please enter a 10-digit Indian mobile number, like 98765 43210.';
  }

  if (values.businessType.trim().length === 0) {
    errors.businessType = 'Please choose what kind of business you run.';
  }

  const requirement = values.requirement.trim();
  if (requirement.length === 0) {
    errors.requirement = 'Tell me in one or two lines what you need.';
  } else if (requirement.length < 10) {
    errors.requirement = 'A little more detail helps me give you an accurate answer.';
  } else if (requirement.length > 1200) {
    errors.requirement = 'Please keep this under 1200 characters.';
  }

  return errors;
}

/** Business types offered in the contact form's select. */
export const businessTypes = [
  'Shop / Retail store',
  'Wholesale / Trading',
  'Manufacturing',
  'Clinic / Healthcare',
  'Coaching / Education',
  'Restaurant / Food',
  'Real estate / Construction',
  'Salon / Services',
  'Online / D2C brand',
  'Other',
] as const;
