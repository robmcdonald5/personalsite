<script>
  import Header from '$lib/Header.svelte';
  import Hero from '$lib/Hero.svelte';
  import CodeSamples from '$lib/CodeSamples.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<div class="flex justify-center items-center flex-col px-[180px] bg-[#FFFFFF]">
  <div class="w-[1440px] flex justify-center items-center flex-col gap-2.5 px-[180px]">
    <Header />
  </div>
  <Hero />
  <CodeSamples />
  <div class="w-[1440px] flex justify-center items-center flex-col gap-2.5 px-[180px]">
    <Footer />
  </div>
</div>