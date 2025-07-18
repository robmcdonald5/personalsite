<script>
  import Header from '$lib/Header.svelte';
  import Hero from '$lib/Hero.svelte';
  import CodeSamples from '$lib/CodeSamples.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF]">
  <div class="w-full bg-[#111111] flex justify-center">
    <div class="w-[1440px] flex justify-center items-center flex-col gap-2.5 px-[180px]">
      <Header />
    </div>
  </div>
  <div class="w-full bg-[#FFFFFF] flex justify-center">
    <Hero />
  </div>
  <div class="w-full h-[4px] gradient-divider"></div>
  <div class="w-full bg-[#FFFFFF] flex justify-center">
    <CodeSamples />
  </div>
  <div class="w-full h-[4px] gradient-divider"></div>
  <div class="w-full bg-[#F5F5F5] flex justify-center">
    <div class="w-[1440px] flex justify-center items-center flex-col gap-2.5 px-[180px]">
      <Footer />
    </div>
  </div>
</div>