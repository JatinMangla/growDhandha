/** Joins class names, dropping falsy values. Keeps conditional styling readable. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** 10500 -> "10,500" using Indian digit grouping. */
export function formatIndianNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

/** 4999 -> "₹4,999". The one place a rupee amount is turned into display text. */
export function formatINR(value: number): string {
  return `₹${formatIndianNumber(value)}`;
}
