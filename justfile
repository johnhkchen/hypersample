help:
	cat justfile

fmt:
	pnpm exec prettier src/ --write

dev:
	pnpm dev

windows:
	# You can use these commands using this format:
	# just --shell powershell.exe --shell-arg -c windows
