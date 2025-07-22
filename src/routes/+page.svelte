<script>
  import Header from '$lib/Header.svelte';
  import Hero from '$lib/Hero.svelte';
  import CodeSamples from '$lib/CodeSamples.svelte';
  import WasmDemo from '$lib/WasmDemo.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
  <header class="w-full bg-[#111111] flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <div class="w-full bg-[#FFFFFF] flex justify-center">
      <Hero />
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
    <div class="w-full bg-[#FFFFFF] flex justify-center flex-grow">
      <CodeSamples />
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
    <div class="w-full bg-[#FFFFFF] flex justify-center">
      <WasmDemo />
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>