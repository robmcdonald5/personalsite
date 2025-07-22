<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>Contact - Joshua McDonald</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
  <header class="w-full bg-[#111111] flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- Hero Section -->
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[90px] relative">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <div class="flex flex-col md:flex-row items-center justify-between gap-[60px] md:gap-[120px]">
          <!-- Hero Text Content -->
          <div class="flex flex-col gap-6 max-w-[500px]">
            <h1 class="text-[#4B4B4B] text-[48px] md:text-[48px] font-inter font-bold tracking-[-0.96px] leading-tight">
              Need to get in touch with me?
            </h1>
          </div>
        </div>
        
        <!-- Visual Elements - Absolutely positioned -->
        <div class="absolute top-[125px] right-[335px] hidden md:block">
          <img src="/hero__visual-element-square.svg" alt="decorative square" class="w-[64px] h-[64px]" />
        </div>
        <div class="absolute top-[230px] right-[325px] hidden md:block">
          <img src="/hero__visual-element-circle2.svg" alt="decorative circle" class="w-[48px] h-[48px]" />
        </div>
        <div class="absolute top-[80px] right-[180px] hidden md:block">
          <img src="/hero__visual-element-circle1.svg" alt="decorative circle" class="w-[96px] h-[96px]" />
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>

    <!-- Contact Form Section -->
    <div class="w-full bg-[#FAFAFA] flex justify-center py-[90px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <div class="w-full max-w-[1080px] mx-auto">
          <!-- Section Title -->
          <div class="mb-[60px]">
            <h2 class="text-[#4B4B4B] text-[48px] font-inter font-bold tracking-[-0.96px]">
              Contact me
            </h2>
          </div>

          <!-- Contact Form -->
          <form class="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[24px] mb-[40px]">
            <!-- Name Field -->
            <div class="flex flex-col gap-2">
              <label class="text-[#333333] font-inter font-medium" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                class="h-[48px] px-4 py-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-lg text-[#333333] font-inter placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A90E2] transition-colors"
              />
            </div>

            <!-- Email Field -->
            <div class="flex flex-col gap-2">
              <label class="text-[#333333] font-inter font-medium" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                class="h-[48px] px-4 py-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-lg text-[#333333] font-inter placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A90E2] transition-colors"
              />
            </div>

            <!-- Message Field -->
            <div class="flex flex-col gap-2 md:col-span-2">
              <label class="text-[#333333] font-inter font-medium" for="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Enter your message"
                class="px-4 py-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-lg text-[#333333] font-inter placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A90E2] transition-colors resize-vertical"
              ></textarea>
            </div>
          </form>

          <!-- Submit Button -->
          <div class="flex justify-start">
            <button
              type="submit"
              class="flex items-center justify-center py-[15px] px-[37px] bg-[#2D2D2D] rounded-lg text-[#FFFFFF] font-inter font-medium hover:bg-[#1A1A1A] transition-colors"
            >
              Send email
            </button>
          </div>
        </div>
      </section>
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>