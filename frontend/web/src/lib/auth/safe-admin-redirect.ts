const DEFAULT_ADMIN_PATH = '/admin';

/**
 * Post-login redirect target taken from ?next=. Only same-origin relative
 * paths inside the admin area are allowed ("/admin", "/admin/...",
 * "/admin?...", "/admin#..."); anything else (absolute URLs, "//host",
 * backslashes, schemes, control characters) falls back to /admin.
 */
export function getSafeAdminRedirect(next: string | null | undefined): string {
  if (!next) return DEFAULT_ADMIN_PATH;
  if (/[\\\u0000-\u001f\u007f\s]/.test(next)) return DEFAULT_ADMIN_PATH;
  if (!/^\/admin(?:[/?#]|$)/.test(next)) return DEFAULT_ADMIN_PATH;
  return next;
}
