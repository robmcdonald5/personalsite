### Core Technologies
1. Framework: SvelteKit
2. UI Library: Svelte 5
3. Language: TypeScript
4. CSS Framework: Tailwind CSS 4
    - Take care to properly follow documentation on using Tailwind 4 with SvelteKit

### State management with Svelte 5 Runes
1. Runes-First Approach: All new reactive state should be managed using Svelte 5 Runes. Prioritize $state for local or shared mutable state, $derived for computed values, and $effect for running side effects in response to state changes. This ensures a modern and consistent reactivity model across the application.
2. Shared State Modules: For state that needs to be shared across multiple components, create dedicated TypeScript files. By using the .svelte.ts extension, you can export reactive runes directly from these modules, making your global state simple and easy to manage without traditional stores.
3. Replacing Legacy Stores: While Svelte's traditional stores (writable, readable) still work, the default approach should be to use runes. Only use legacy stores if there is a specific need for interoperability with older libraries.
4. Leverage SvelteKit's $page Store: For page-specific information, such as the current URL pathname, continue to use SvelteKit's built-in $page store. It is the idiomatic way to access route data and integrates seamlessly with runes.

### Build Tools & Dependencies
1. Node.js: Latest LTS (Long-Term Support) version
2. Package Manager: pnpm (or npm)
3. CSS Processor: PostCSS with the following plugins:
    - @tailwindcss/postcss (Required for Tailwind CSS v4+)
    - autoprefixer

### Key Configuration Files
1. svelte.config.js
2. tailwind.config.js
3. postcss.config.js

### WebAssembly (WASM) Integration Guidelines
1. **WASM Module Location**: All WASM modules are located in `/static/wasm-modules/` (git-ignored) and built from `/wasm-modules/` source (tracked)
2. **Build Commands**: 
   - `npm run build` - full build with WASM (for production deployment)
   - `npm run build:client-only` - builds without WASM (fallback for environments without Rust)
   - `npm run build:wasm` - builds only WASM modules
3. **Git Strategy**: WASM build artifacts are git-ignored; Vercel builds WASM during deployment from Rust source
4. **Cache Management**: Always use cache-busting parameters when importing WASM modules to prevent browser caching issues
5. **Error Handling**: Implement defensive programming with proper validation, fallbacks, and detailed error logging for WASM operations
6. **Thumbnail Operations**: Validate dimensions before canvas operations to prevent IndexSizeError
7. **Cross-Platform**: Build process uses cpx for cross-platform file copying (Windows + Linux compatibility)

### TypeScript and Svelte 5 Standards
1. **Script Tags**: Always use `<script lang="ts">` for TypeScript support in .svelte files
2. **Type Annotations**: Provide explicit types for runes: `$state<Type>(initial)` 
3. **Event Handlers**: Use modern Svelte 5 syntax (`onclick`, `onmouseenter`) instead of legacy (`on:click`)
4. **Validation**: Always run `npm run check` after making changes to ensure TypeScript compilation
5. **Runes Typing**: Use union types for nullable state: `$state<string | null>(null)`

### Accessibility and UX Guidelines
1. **Interactive Elements**: Add proper ARIA roles (`role="navigation"`, `role="group"`) to divs with mouse event handlers
2. **Auto-close Behavior**: Implement 2-second delay for dropdown auto-close with proper timer cleanup
3. **Component Heights**: Project category dropdowns should use `h-[80px]` for consistency
4. **Mouse Events**: Always pair `onmouseenter` with `onmouseleave` and implement proper timeout management

### Asset Management
1. **SVG Files**: Verify file paths match actual filenames in `/static/` directory
2. **Error Handling**: Add `onerror` handlers for images to gracefully handle missing assets
3. **Preloading**: Critical SVGs should be preloaded in `app.html` for performance

### Development Workflow
1. **Type Checking**: Run `npm run check` after any code changes
2. **Build Testing**: Test both development and production builds before deployment
3. **WASM Updates**: After modifying Rust code, always run `npm run build:wasm` and test in browser
4. **Cross-Platform**: Be aware of Windows vs Linux differences in build tools (wasm-pack, Rust installation)