#!/bin/bash
# Regenerate TypeScript types from Rust parameter registry
echo "🔄 Generating TypeScript types from Rust parameter registry..."
cd ../wasm/vectorize-core
cargo run --bin generate-types --quiet -- ../../frontend/src/lib/types/generated-parameters.ts
if [ $? -eq 0 ]; then
  echo "✅ TypeScript types generated successfully"
else
  echo "❌ Failed to generate TypeScript types"
  exit 1
fi
cd ../../frontend
echo "🏁 Type generation complete!"
