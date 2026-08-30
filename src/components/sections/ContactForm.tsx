'use client';

import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { site, whatsappLink } from '@/data/site';
import {
  businessTypes,
  sanitize,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/validation';
import { cn } from '@/lib/utils';

const EMPTY: ContactValues = { name: '', phone: '', businessType: '', requirement: '' };

/**
 * The form composes a clean enquiry and hands it to WhatsApp — the channel
 * this audience actually uses — with an email fallback for anyone who prefers
 * it. No server, no third-party form service, so nothing a visitor types is
 * stored anywhere outside their own device.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof ContactValues) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const buildMessage = (clean: ContactValues) =>
    [
      'Hi Jatin, I want to discuss a project.',
      '',
      `Name: ${clean.name}`,
      `Phone: ${clean.phone}`,
      `Business: ${clean.businessType}`,
      `Requirement: ${clean.requirement}`,
    ].join('\n');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clean: ContactValues = {
      name: sanitize(values.name, 80),
      phone: sanitize(values.phone, 20),
      businessType: sanitize(values.businessType, 60),
      requirement: sanitize(values.requirement, 1200),
    };

    const nextErrors = validateContact(clean);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    window.open(whatsappLink(buildMessage(clean)), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (submitted) {
    const clean = sanitize(values.name, 80).split(' ')[0] ?? '';
    return (
      <div className="surface-card flex flex-col items-start gap-4 p-6 sm:p-8" role="status">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-ink">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="text-display-sm">Thanks{clean ? `, ${clean}` : ''} — your message is ready.</h3>
        <p className="text-sm leading-relaxed text-muted">
          WhatsApp should have opened in a new tab with your details filled in. Press send there and I
          will reply within {site.responseTime}. If the tab did not open, use the WhatsApp or call
          button beside this form.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface-card flex flex-col gap-5 p-6 sm:p-8">
      <Field
        id="contact-name"
        label="Your name"
        error={errors.name}
        input={
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={values.name}
            onChange={(event) => update('name')(event.target.value)}
            placeholder="Ramesh Kumar"
            className={inputClass(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
        }
      />

      <Field
        id="contact-phone"
        label="Phone number"
        hint="I will call or WhatsApp you on this number."
        error={errors.phone}
        input={
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={20}
            value={values.phone}
            onChange={(event) => update('phone')(event.target.value)}
            placeholder="98765 43210"
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : 'contact-phone-hint'}
          />
        }
      />

      <Field
        id="contact-businessType"
        label="What kind of business?"
        error={errors.businessType}
        input={
          <select
            id="contact-businessType"
            name="businessType"
            value={values.businessType}
            onChange={(event) => update('businessType')(event.target.value)}
            className={inputClass(Boolean(errors.businessType))}
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={errors.businessType ? 'contact-businessType-error' : undefined}
          >
            <option value="">Choose one</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        }
      />

      <Field
        id="contact-requirement"
        label="What do you need?"
        hint="A line or two is enough — a website, an app, billing software, anything."
        error={errors.requirement}
        input={
          <textarea
            id="contact-requirement"
            name="requirement"
            rows={4}
            maxLength={1200}
            value={values.requirement}
            onChange={(event) => update('requirement')(event.target.value)}
            placeholder="I run a hardware shop in Karol Bagh and need a website plus a simple billing system."
            className={cn(inputClass(Boolean(errors.requirement)), 'resize-y')}
            aria-invalid={Boolean(errors.requirement)}
            aria-describedby={
              errors.requirement ? 'contact-requirement-error' : 'contact-requirement-hint'
            }
          />
        }
      />

      <Button type="submit" size="lg" className="w-full">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send on WhatsApp
      </Button>

      <p className="text-xs leading-relaxed text-subtle">
        Your details go straight to my WhatsApp — nothing is stored on this website and nothing is
        shared with anyone. Prefer email?{' '}
        <a
          href={`mailto:${site.email}`}
          className="inline-block py-1 font-medium text-brand-ink underline underline-offset-2"
        >
          {site.email}
        </a>
      </p>
    </form>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    'w-full rounded-soft border bg-bg px-4 py-3 text-base text-fg transition-colors duration-200 placeholder:text-subtle',
    hasError ? 'border-red-500/70' : 'border-line hover:border-brand/50',
  );
}

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
};

function Field({ id, label, hint, error, input }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-subtle">
          {hint}
        </p>
      ) : null}
      {input}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
