#!/bin/sh
# .git/hooks/pre-commit
#
# Rebuilds compiled-write.txt automatically when any data file or write.txt changes.
# Install: copy this file to .git/hooks/pre-commit and run: chmod +x .git/hooks/pre-commit

CHANGED=$(git diff --cached --name-only)

echo "$CHANGED" | grep -qE '^(data/|prompts/write\.txt)' || exit 0

echo "→ Data files changed — rebuilding compiled-write.txt..."

node build-compiled.js

if [ $? -ne 0 ]; then
  echo "✗ Build failed. Commit aborted."
  exit 1
fi

git add prompts/compiled-write.txt
echo "✓ compiled-write.txt staged."
