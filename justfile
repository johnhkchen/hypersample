help:
	cat justfile

fmt:
	pnpm exec prettier src/ --write

dev:
	pnpm dev
