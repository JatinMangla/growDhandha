import { describe, expect, it } from 'vitest';
import { normalisePhone, sanitize, validateContact, type ContactValues } from '@/lib/validation';

const valid: ContactValues = {
  name: 'Ramesh Kumar',
  phone: '',
  businessType: 'Shop / Retail store',
  requirement: 'I need a website and a simple billing system.',
};

describe('sanitize', () => {
  it('strips angle brackets and control characters', () => {
    expect(sanitize('<b>Hi</b>\u0007 there')).toBe('bHi/b there');
  });

  it('collapses whitespace and caps length', () => {
    expect(sanitize('  a   b  ')).toBe('a b');
    expect(sanitize('abcdef', 3)).toBe('abc');
  });

  it('flattens newlines by default', () => {
    expect(sanitize('one\ntwo')).toBe('one two');
  });

  it('keeps line breaks in multiline mode, at most one blank line', () => {
    expect(sanitize('- website\r\n- billing\n\n\n\nthanks  ', 1200, { multiline: true })).toBe(
      '- website\n- billing\n\nthanks',
    );
  });
});

describe('normalisePhone', () => {
  it.each([
    ['98765 43210', '9876543210'],
    ['+91 98765 43210', '9876543210'],
    ['919876543210', '9876543210'],
    ['09876543210', '9876543210'],
  ])('accepts %s', (input, expected) => {
    expect(normalisePhone(input)).toBe(expected);
  });

  it.each(['12345', '5876543210', '98765432101'])('rejects %s', (input) => {
    expect(normalisePhone(input)).toBeNull();
  });
});

describe('validateContact', () => {
  it('passes a complete enquiry with no phone, because the phone is optional', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('rejects a phone that was given but is not a mobile number', () => {
    expect(validateContact({ ...valid, phone: '12345' }).phone).toBeDefined();
  });

  it('asks for more detail on a one-word requirement', () => {
    expect(validateContact({ ...valid, requirement: 'site' }).requirement).toBeDefined();
  });
});
