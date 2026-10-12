# PixelArt SDD Project Context

## Stack
- Backend: NestJS 10, TypeORM, PostgreSQL 16
- Frontend: Next.js 15 App Router, React 19, custom CSS/design tokens
- Payments: existing public payment link, Yape QR/voucher upload, and administrative payment review
- Orders: existing shared order administration workflow

## Quality gates
- Backend: `cd backend/api && npm test -- --runInBand && npm run build`
- Frontend: `cd frontend/web && npm test && npm run build`
- Repository: `git diff --check`

## Current SDD preflight
- Execution: automatic
- Artifact store: both OpenSpec files and Engram
- Review strategy: split at more than 400 changed lines into chained review units when practical
- No commits, pushes, deploys, volume recreation, or destructive data changes without explicit user approval
