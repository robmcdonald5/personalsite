<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>Chipotle AI Menu - Joshua McDonald</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
  <header class="w-full bg-[#111111] flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- Hero Section -->
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[80px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-4 mb-[60px]">
          <h1 class="text-[#2D2D2D] text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
            Chipotle AI Menu
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[650px]">
            Conversational AI chatbot that lets users place Chipotle orders using natural language — built with React, MongoDB, Flask, spaCy, NLTK, PyTorch.
          </p>
        </div>
      </section>
    </div>
    
    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>