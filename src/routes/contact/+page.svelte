<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import { Turnstile } from 'svelte-turnstile';
  import { env } from '$env/dynamic/public';

  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let submitError = $state<string | null>(null);
  let turnstileToken = $state<string | null>(null);
  let resetTurnstile: (() => void) | undefined = $state();
  
  // Form field values
  let name = $state('');
  let email = $state('');
  let message = $state('');
  
  const FORMSPARK_ACTION_URL = `https://submit-form.com/${env.PUBLIC_FORMSPARK_FORM_ID}`;

  async function handleSubmit() {
    if (!turnstileToken) {
      submitError = 'Please complete the security verification.';
      return;
    }
    
    if (!name || !email || !message) {
      submitError = 'Please fill in all required fields.';
      return;
    }

    try {
      isSubmitting = true;
      submitError = null;
      
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          "cf-turnstile-response": turnstileToken,
        }),
      });
      
      // Reset form
      name = '';
      email = '';
      message = '';
      turnstileToken = null;
      if (resetTurnstile) resetTurnstile();
      
      isSubmitted = true;
      
    } finally {
      isSubmitting = false;
    }
  }

  function handleTurnstileCallback(event: CustomEvent<{ token: string; preClearanceObtained: boolean; }>) {
    turnstileToken = event.detail.token;
  }

  function handleTurnstileExpired() {
    turnstileToken = null;
  }
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
      <section class="relative w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <div class="flex flex-col md:flex-row items-center justify-between gap-[60px] md:gap-[120px]">
          <!-- Hero Text Content -->
          <div class="flex flex-col gap-6 max-w-[500px]">
            <h1 class="text-[#4B4B4B] text-[48px] md:text-[48px] font-inter font-bold tracking-[-0.96px] leading-tight">
              Need to get in touch with me?
            </h1>
          </div>
        </div>

        <!-- Visual Elements -->
        <!-- We mirror the left padding using pr-[5%] md:pr-[180px] so spacing matches the text block's left padding -->
        <div class="pointer-events-none absolute inset-0 hidden md:flex justify-start items-center">
          <div class="relative w-full pr-[180px]">
            <!-- Big circle - top right -->
            <img src="/hero__visual-element-circle1.svg" alt="decorative circle" class="w-[96px] h-[96px] absolute top-[-75px] right-[200px]" />
            <!-- Square - middle left of the group -->
            <img src="/hero__visual-element-square.svg" alt="decorative square" class="w-[64px] h-[64px] absolute top-[-30px] right-[355px]" />
            <!-- Small circle - bottom center -->
            <img src="/hero__visual-element-circle2.svg" alt="decorative circle" class="w-[48px] h-[48px] absolute top-[75px] right-[335px]" />
          </div>
        </div>

        <!-- Mobile shapes (optional) -->
        <div class="pointer-events-none absolute inset-0 flex md:hidden justify-start items-center">
          <div class="relative w-full pr-[5%]">
            <!-- Big circle - top right -->
            <img src="/hero__visual-element-circle1.svg" alt="decorative circle" class="w-[72px] h-[72px] absolute top-[-60px] right-[150px]" />
            <!-- Square - middle left of the group -->
            <img src="/hero__visual-element-square.svg" alt="decorative square" class="w-[52px] h-[52px] absolute top-[-25px] right-[265px]" />
            <!-- Small circle - bottom center -->
            <img src="/hero__visual-element-circle2.svg" alt="decorative circle" class="w-[40px] h-[40px] absolute top-[55px] right-[250px]" />
          </div>
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

          <!-- Success Message -->
          {#if isSubmitted}
            <div class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <h3 class="text-green-800 font-inter font-semibold">Message sent successfully!</h3>
                  <p class="text-green-700 font-inter text-sm mt-1">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              </div>
            </div>
          {/if}

          <!-- Error Message -->
          {#if submitError}
            <div class="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <div>
                  <h3 class="text-red-800 font-inter font-semibold">Error sending message</h3>
                  <p class="text-red-700 font-inter text-sm mt-1">{submitError}</p>
                </div>
              </div>
            </div>
          {/if}

          <!-- Contact Form -->
          <form 
            onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            class="grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[24px] mb-[40px]"
          >
            <!-- Name Field -->
            <div class="flex flex-col gap-2">
              <label class="text-[#333333] font-inter font-medium" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                bind:value={name}
                required
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
                bind:value={email}
                required
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
                bind:value={message}
                rows="6"
                required
                placeholder="Enter your message"
                class="px-4 py-3.5 bg-[#FFFFFF] border border-[#E5E5E5] rounded-lg text-[#333333] font-inter placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A90E2] transition-colors resize-vertical"
              ></textarea>
            </div>

            <!-- Turnstile CAPTCHA -->
            <div class="flex justify-center md:col-span-2 mb-6">
              <Turnstile 
                siteKey={env.PUBLIC_TURNSTILE_SITE_KEY}
                theme="light"
                on:callback={handleTurnstileCallback}
                on:expired={handleTurnstileExpired}
                bind:reset={resetTurnstile}
              />
            </div>

            <!-- Submit Button -->
            <div class="flex justify-start md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting || !turnstileToken || !name || !email || !message}
                class="flex items-center justify-center py-[15px] px-[37px] bg-[#2D2D2D] rounded-lg text-[#FFFFFF] font-inter font-medium hover:bg-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2D2D2D]"
              >
                {#if isSubmitting}
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                {:else}
                  Send email
                {/if}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>