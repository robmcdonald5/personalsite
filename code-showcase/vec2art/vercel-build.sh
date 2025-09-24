#!/bin/bash
# Ensure required tools are available
if ! command -v rustc &> /dev/null; then
  echo "🦀 Installing Rust..."
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  source $HOME/.cargo/env
  rustup target add wasm32-unknown-unknown
fi
if ! command -v wasm-pack &> /dev/null; then
  echo "📦 Installing wasm-pack..."
  curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
fi
# Build and verify output
./scripts/rebuild-wasm.sh
required_files=("frontend/src/lib/wasm/vectorize_wasm.js" "frontend/src/lib/wasm/vectorize_wasm_bg.wasm" ...)
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Required file missing: $file"
    exit 1
  fi
done
echo "🎉 WASM build completed successfully for Vercel deployment!"
