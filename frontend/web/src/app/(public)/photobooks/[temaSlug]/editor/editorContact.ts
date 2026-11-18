// Single source of truth for the phone rule of the editor's order form (step 4)
// and for adapting contact data captured elsewhere so it can prefill that form.
const EDITOR_PHONE_PATTERN = /^(\+51)?\d{9}$/;
const PHONE_SEPARATORS = /[\s().-]/g;
const PERU_COUNTRY_CODE = /^\+?51(?=\d{9}$)/;

export type ContactPrefill = { name?: string | null; email?: string | null; phone?: string | null };

export function isValidEditorPhone(phone: string): boolean {
  return EDITOR_PHONE_PATTERN.test(phone.replace(/\s/g, ""));
}

/**
 * Converts a phone typed elsewhere (the custom request form accepts international
 * numbers with separators) to `+51` followed by 9 digits. Returns an empty string
 * when the editor rule would reject it, so the customer types a valid number
 * instead of fixing a prefilled one.
 */
export function normalizeEditorPhone(raw: string | null | undefined): string {
  if (typeof raw !== "string") return "";
  const nationalNumber = raw.replace(PHONE_SEPARATORS, "").replace(PERU_COUNTRY_CODE, "");
  const normalized = `+51${nationalNumber}`;
  return isValidEditorPhone(normalized) ? normalized : "";
}

function isBlank(value: unknown) {
  return typeof value !== "string" || value.trim() === "";
}

/** Fills only the blank name, email and phone fields; never replaces a value the form already holds. */
export function fillEmptyContactFields<T extends { name?: unknown; email?: unknown; phone?: unknown }>(form: T, contact: ContactPrefill | undefined): T {
  if (!contact) return form;
  const candidates = {
    name: contact.name?.trim() ?? "",
    email: contact.email?.trim() ?? "",
    phone: normalizeEditorPhone(contact.phone),
  };
  let next = form;
  for (const key of ["name", "email", "phone"] as const) {
    if (candidates[key] && isBlank(form[key])) next = { ...next, [key]: candidates[key] };
  }
  return next;
}
