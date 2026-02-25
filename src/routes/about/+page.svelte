<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>About - Joshua McDonald | Software Engineer</title>
  <meta name="description" content="Software engineer based in Texas focused on AI, LLM-powered tools, and systems programming with Rust and WebGPU." />
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
  <header class="w-full bg-bg-dark flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- About Hero Section -->
    <div class="w-full bg-white flex justify-center">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[20px] lg:gap-[90px] pt-[20px] lg:pt-[40px]">
          <!-- About Text Content - Left Side -->
          <div class="flex flex-col gap-[16px] max-w-[500px] lg:self-start lg:mt-[40px] pb-[20px] lg:pb-0 px-4 lg:px-0">
            <h1 class="text-text-heading text-[32px] lg:text-[64px] font-inter font-bold tracking-[-1.28px] text-center lg:text-left">
              about
            </h1>
            <p class="text-text-body font-inter font-light text-base lg:text-lg text-center lg:text-left">
              Software engineer based in Texas.
            </p>
            <p class="text-black text-sm lg:text-base font-inter font-extralight max-w-full lg:max-w-[280px] text-center lg:text-left">
              Right now I'm focused on AI — building LLM-powered tools, training
              models, and pushing performance boundaries with Rust and WebGPU.
              I'm drawn to the intersection of creative tools, real-time systems,
              and machine learning.
            </p>
          </div>

          <!-- Profile Image - Right Side, extends to bottom -->
          <div class="w-[150px] lg:w-[285px] h-[240px] lg:h-[456px] bg-contain bg-center lg:bg-bottom bg-no-repeat justify-self-center lg:justify-self-end lg:self-end mx-auto lg:mx-0" style="background-image: url(/hero__headshot.png)"></div>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>

    <!-- Content Section -->
    <div class="w-full bg-bg-light flex justify-center items-center flex-grow py-[40px] lg:py-[80px]">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <!-- Row 1: Experience + Expertise -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 lg:px-0 mb-[40px] lg:mb-[64px]">
          <!-- Experience Card -->
          <div class="flex flex-col gap-5 bg-white border border-border-default rounded-2xl p-6 lg:p-8">
            <h2 class="text-text-body text-[20px] lg:text-[28px] font-inter font-bold tracking-[-0.56px]">
              Experience
            </h2>
            <div class="text-text-heading font-inter leading-relaxed">
              I'm a software engineer with a focus on AI and intelligent systems.
              My background blends a strong foundation in computer science with
              hands-on experience in full-stack development, web-API integration,
              and NLP processing.<br /><br />
              Over the past few years, I've designed and built several AI
              systems—integrating custom NLP pipelines, training deep learning
              models, and deploying them with modern web architectures.
            </div>
          </div>
          <!-- Expertise Card -->
          <div class="flex flex-col gap-5 bg-white border border-border-default rounded-2xl p-6 lg:p-8">
            <h2 class="text-text-body text-[20px] lg:text-[28px] font-inter font-bold tracking-[-0.56px]">
              Expertise
            </h2>
            <ul class="text-text-heading font-inter flex flex-col gap-3 list-disc list-inside">
              <li>Machine Learning & Deep Learning</li>
              <li>NLP Processing & Training</li>
              <li>Scientific Stack Python Libraries</li>
              <li>Intent Training & Chatbot Design</li>
              <li>Docker + Containerized Deployments</li>
              <li>REST API Integration</li>
              <li>Git & CI/CD Pipelines</li>
              <li>MongoDB, Postgres, supabase</li>
              <li>Server Deployment & Virtualization</li>
            </ul>
          </div>
        </div>

        <!-- Row 2: Recent Projects (full width) -->
        <div class="px-4 lg:px-0">
          <div class="flex items-baseline justify-between mb-6 lg:mb-8">
            <h2 class="text-text-body text-[20px] lg:text-[28px] font-inter font-bold tracking-[-0.56px]">
              Recent Projects
            </h2>
            <a
              href="/work"
              class="text-primary font-inter font-medium text-sm lg:text-base hover:underline transition-colors duration-200"
            >
              View all projects &rarr;
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <!-- vec2art -->
            <a
              href="/work/vec2art"
              class="group block bg-white border border-border-default rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            >
              <div class="aspect-video overflow-hidden bg-bg-lighter">
                <img
                  src="/project-previews/vec2art.png"
                  alt="vec2art SVG Converter"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <h3 class="text-sm lg:text-base font-inter font-semibold text-text-heading mb-1">vec2art SVG Converter</h3>
                <p class="text-xs lg:text-sm font-inter text-text-muted line-clamp-2">
                  Ultra-fast image vectorization tool built with Rust, featuring GPU acceleration and WebAssembly.
                </p>
              </div>
            </a>
            <!-- Chipotle AI -->
            <a
              href="/work/ai-menu-chatbot"
              class="group block bg-white border border-border-default rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            >
              <div class="aspect-video overflow-hidden bg-bg-lighter">
                <img
                  src="/project-previews/ai-menu-chatbot.png"
                  alt="Chipotle AI Ordering System"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <h3 class="text-sm lg:text-base font-inter font-semibold text-text-heading mb-1">Chipotle AI Ordering System</h3>
                <p class="text-xs lg:text-sm font-inter text-text-muted line-clamp-2">
                  AI-based ordering system that turns Chipotle ordering fully autonomous.
                </p>
              </div>
            </a>
            <!-- PoE Market Analyzer -->
            <a
              href="/work/poe-market-analyzer"
              class="group block bg-white border border-border-default rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            >
              <div class="aspect-video overflow-hidden bg-bg-lighter">
                <img
                  src="/project-previews/poe-market-analyzer.png"
                  alt="Path of Exile Market Analyzer"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <h3 class="text-sm lg:text-base font-inter font-semibold text-text-heading mb-1">PoE Market Analyzer</h3>
                <p class="text-xs lg:text-sm font-inter text-text-muted line-clamp-2">
                  Web app + newsletter utilizing PoE's API for market trend analysis and reports.
                </p>
              </div>
            </a>
            <!-- claudefig -->
            <a
              href="/work/claudefig"
              class="group block bg-white border border-border-default rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            >
              <div class="aspect-video overflow-hidden bg-bg-lighter">
                <img
                  src="/project-previews/claudefig.png"
                  alt="claudefig"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <h3 class="text-sm lg:text-base font-inter font-semibold text-text-heading mb-1">claudefig</h3>
                <p class="text-xs lg:text-sm font-inter text-text-muted line-clamp-2">
                  Universal config CLI/TUI for managing Claude Code project configurations.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-bg-footer flex justify-center">
    <Footer />
  </footer>
</div>
