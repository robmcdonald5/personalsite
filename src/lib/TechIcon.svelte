<script lang="ts">
  export let name: string;
  export let width: string = "32px";
  export let height: string = "32px";
  export let className: string = "";

  // Map of tech names to their SVG paths - only load what's needed per page
  const icons: Record<string, string> = {
    sveltekit: "/tech-stack__sveltekit-icon.svg",
    vercel: "/tech-stack__vercel-icon.svg", 
    formspree: "/tech-stack__formspree-icon.svg",
    rust: "/tech-stack__rust-icon.svg",
    wasm: "/tech-stack__wasm-icon.svg",
    beautifulsoup: "/tech-stack__beautifulsoup-icon.svg",
    fastapi: "/tech-stack__fastapi-icon.svg",
    flask: "/tech-stack__flask-icon.svg",
    githubpages: "/tech-stack__githubpages-icon.svg",
    heroku: "/tech-stack__heroku-icon.svg",
    langchain: "/tech-stack__langchain-icon.svg",
    mongodb: "/tech-stack__mongodb-icon.svg",
    nextjs: "/tech-stack__nextjs-icon.svg",
    postgres: "/tech-stack__postgres-icon.svg",
    python: "/tech-stack__python-icon.svg",
    pytorch: "/tech-stack__pytorch-icon.svg",
    react: "/tech-stack__react-icon.svg",
    supabase: "/tech-stack__supabase-icon.svg",
    tauri: "/tech-stack__tauri-icon.svg",
    typescript: "/tech-stack__typescript-icon.svg"
  };

  $: iconSrc = icons[name] || "";
</script>

{#if iconSrc}
  <img 
    src={iconSrc} 
    alt={name} 
    class={className}
    style="width: {width}; height: {height};"
    loading="lazy"
  />
{:else}
  <!-- Fallback for missing icons -->
  <div 
    class="bg-gray-200 rounded flex items-center justify-center text-xs {className}"
    style="width: {width}; height: {height};"
  >
    {name}
  </div>
{/if}