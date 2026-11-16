import { applyDecorators } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

const ONE_MINUTE_MS = 60_000;

/** Global default applied by the APP_GUARD ThrottlerGuard to every route (per client IP). */
export const DEFAULT_THROTTLE = { ttl: ONE_MINUTE_MS, limit: 120 };

/** Credential guessing: 5 attempts per minute per client IP. */
export const LoginThrottle = () => Throttle({ default: { limit: 5, ttl: ONE_MINUTE_MS } });

/** Public forms that create a request and notify the team by email. */
export const PublicCreateThrottle = (limit = 5) => Throttle({ default: { limit, ttl: ONE_MINUTE_MS } });

/** Customer payment proof submissions (checkout submit, voucher upload). */
export const PaymentSubmitThrottle = () => Throttle({ default: { limit: 10, ttl: ONE_MINUTE_MS } });

/**
 * Admin controllers skip the per-IP default: every call reaches Nest through
 * the Next BFF and pages fan out one request per photo. Paid AI generation is
 * re-enabled explicitly so a stolen session cannot run up the OpenAI bill.
 */
export const AdminThrottleExempt = () => SkipThrottle();
export const AiGenerationThrottle = () =>
  applyDecorators(SkipThrottle({ default: false }), Throttle({ default: { limit: 20, ttl: ONE_MINUTE_MS } }));
