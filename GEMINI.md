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