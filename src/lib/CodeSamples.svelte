<script lang="ts">
	import CodeCarousel from './CodeCarousel.svelte';
</script>

<section class="w-full max-w-[1440px] h-auto lg:h-[656px] flex justify-center items-center flex-col px-[5%] lg:px-[180px] py-[60px] lg:py-0">
  <div class="flex flex-col items-center gap-[40px] lg:gap-[90px] h-full justify-center">
    <div class="flex justify-center items-center flex-row gap-[20px] lg:gap-[49px] w-full max-w-[1080px]">
      <div class="flex-1 h-0 border-solid border-border-light border-b"></div>
      <span class="text-black text-lg lg:text-xl font-montserrat font-medium whitespace-nowrap">CODE SAMPLES</span>
      <div class="flex-1 h-0 border-solid border-border-light border-b"></div>
    </div>
    <CodeCarousel />
  </div>
</section>