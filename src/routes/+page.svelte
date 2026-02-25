<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Hero from '$lib/Hero.svelte';
  import CodeSamples from '$lib/CodeSamples.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>Joshua McDonald - Software Engineer | AI, Python, Rust, TypeScript</title>
  <meta name="description" content="Software Engineer building AI-powered tools, computer vision applications, and full-stack web systems with Python, Rust, and TypeScript." />
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
  <header class="w-full bg-bg-dark flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <div class="w-full bg-white flex justify-center">
      <Hero />
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
    <div class="w-full bg-white flex justify-center flex-grow">
      <CodeSamples />
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-bg-footer flex justify-center">
    <Footer />
  </footer>
</div>
