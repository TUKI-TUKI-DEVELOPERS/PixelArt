import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { EMAIL_TEMPLATE_BY_EVENT } from './email-worker.service';

// Regression guard for enum drift: every event the worker can render must be a
// valid `email_event_type` value, otherwise `EmailService.queue`/`queueOnce`
// fails in Postgres with "invalid input value for enum email_event_type".
const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCHEMA_PATH = join(REPO_ROOT, 'schemaPixelart.sql');
const SEED_PATH = join(__dirname, '..', 'database', 'seed.ts');
const TEMPLATES_DIR = join(__dirname, 'templates');

// Values present in the very first `email_event_type` definition (schema v1).
// Anything added to the enum afterwards must also be added to pre-existing
// databases, which seed.ts does with `ALTER TYPE ... ADD VALUE IF NOT EXISTS`.
const BASELINE_EMAIL_EVENT_TYPES = [
  'PROPOSALS_SENT_TO_CUSTOMER',
  'PAYMENT_PROOF_RECEIVED_ADMIN',
  'PAYMENT_APPROVED_TO_CUSTOMER',
  'PAYMENT_REJECTED_TO_CUSTOMER',
  'DELIVERY_FEEDBACK_REQUEST',
  'UNIFIED_CHECKOUT_SENT',
];

function parseSchemaEmailEventTypes(): string[] {
  const schema = readFileSync(SCHEMA_PATH, 'utf8');
  const match = schema.match(/CREATE TYPE email_event_type AS ENUM \(([\s\S]*?)\);/);
  if (!match) throw new Error('CREATE TYPE email_event_type not found in schemaPixelart.sql');
  return [...match[1].matchAll(/'([A-Z0-9_]+)'/g)].map((value) => value[1]);
}

function parseSeedAddedEmailEventTypes(): string[] {
  const seed = readFileSync(SEED_PATH, 'utf8');
  return [...seed.matchAll(/ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS '([A-Z0-9_]+)'/g)].map((value) => value[1]);
}

describe('email_event_type enum consistency', () => {
  const schemaValues = parseSchemaEmailEventTypes();
  const workerEvents = Object.keys(EMAIL_TEMPLATE_BY_EVENT);

  it('parses a non-empty enum from schemaPixelart.sql', () => {
    expect(schemaValues.length).toBeGreaterThan(0);
    expect(schemaValues).toEqual(expect.arrayContaining(BASELINE_EMAIL_EVENT_TYPES));
  });

  it('declares every worker event in the schema enum', () => {
    const missing = workerEvents.filter((eventType) => !schemaValues.includes(eventType));
    expect(missing).toEqual([]);
  });

  it('adds every post-baseline enum value to existing databases in seed.ts', () => {
    const seedValues = parseSeedAddedEmailEventTypes();
    const missing = schemaValues
      .filter((value) => !BASELINE_EMAIL_EVENT_TYPES.includes(value))
      .filter((value) => !seedValues.includes(value));
    expect(missing).toEqual([]);
  });

  it('only adds values in seed.ts that also exist in the schema enum', () => {
    const unknown = parseSeedAddedEmailEventTypes().filter((value) => !schemaValues.includes(value));
    expect(unknown).toEqual([]);
  });

  it('ships a template file for every worker event', () => {
    const missing = Object.entries(EMAIL_TEMPLATE_BY_EVENT)
      .filter(([, fileName]) => !existsSync(join(TEMPLATES_DIR, fileName)))
      .map(([eventType]) => eventType);
    expect(missing).toEqual([]);
  });
});
