<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>About - Joshua McDonald</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
  <header class="w-full bg-[#111111] flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- About Hero Section -->
    <div class="w-full bg-[#FFFFFF] flex justify-center">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[20px] lg:gap-[90px] pt-[20px] lg:pt-[40px]">
          <!-- About Text Content - Left Side -->
          <div class="flex flex-col gap-[16px] max-w-[500px] lg:self-start lg:mt-[40px] pb-[20px] lg:pb-0 px-4 lg:px-0">
            <h1 class="text-[#2D2D2D] text-[32px] lg:text-[64px] font-inter font-bold tracking-[-1.28px] text-center lg:text-left">
              about
            </h1>
            <p class="text-[#4B4B4B] font-inter font-light text-base lg:text-lg text-center lg:text-left">
              I'm a software engineer and AI<br />
              enthusiast based in Texas.
            </p>
            <p class="text-[#000000] text-sm lg:text-base font-inter font-extralight max-w-full lg:max-w-[280px] text-center lg:text-left">
              I've been working with and building software systems for most of my
              life. Currently I am focused on making AI applications — blending
              creativity, efficiency, and elegance.
            </p>
          </div>
          
          <!-- Profile Image - Right Side, extends to bottom -->
          <div class="w-[150px] lg:w-[285px] h-[240px] lg:h-[456px] bg-contain bg-center lg:bg-bottom bg-no-repeat justify-self-center lg:justify-self-end lg:self-end mx-auto lg:mx-0" style="background-image: url(/hero__headshot.png)"></div>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>

    <!-- Content Section -->
    <div class="w-full bg-[#FAFAFA] flex justify-center items-center flex-grow py-[40px] lg:py-[80px]">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-[16px] lg:gap-x-[27px] gap-y-[32px] lg:gap-y-[76px] px-4 lg:px-0">
          <!-- Experience Column -->
          <div class="flex flex-col gap-6">
            <h2 class="text-[#4B4B4B] text-[20px] lg:text-[28px] font-inter font-bold tracking-[-0.56px]">
              Experience
            </h2>
            <div class="text-[#2D2D2D] font-inter leading-relaxed">
              I'm a software engineer with a focus on AI and intelligent systems.
              My background blends a strong foundation in computer science with
              hands-on experience in full-stack development, web-API integration,
              and NLP processing.<br /><br />
              Over the past few years, I've designed and built several AI
              systems—integrating custom NLP pipelines, training deep learning
              models, and deploying them with modern web architectures.
            </div>
          </div>
          <!-- Expertise Column -->
          <div class="flex flex-col gap-6 lg:justify-self-center">
            <h2 class="text-[#4B4B4B] text-[20px] lg:text-[28px] font-inter font-bold tracking-[-0.56px]">
              Expertise
            </h2>
            <ul class="text-[#2D2D2D] font-inter flex flex-col gap-3 list-disc list-inside">
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
          <!-- Recent Projects Column -->
          <div class="flex flex-col gap-6">
            <h2 class="text-[#4B4B4B] text-[20px] lg:text-[28px] font-inter font-bold tracking-[-0.56px]">
              Recent Projects
            </h2>
            <div class="text-[#2D2D2D] flex flex-col gap-8">
              <div>
                <h3 class="text-lg font-inter font-semibold mb-1">
                  Chipotle AI Ordering System
                </h3>
                <p class="font-inter">
                  Project lead and designer for an AI based ordering system that
                  turns Chipotle ordering fully autonomous.
                </p>
              </div>
                        
              <div>
                <h3 class="text-lg font-inter font-semibold mb-1">
                  Path of Exile Market Analyzer
                </h3>
                <p class="font-inter">
                  In progress developing web app + newsletter that utilizes PoE's
                  API backend to do market trend analysis and reports for users.
                </p>
              </div>
                        
              <div>
                <h3 class="text-lg font-inter font-semibold mb-1">
                  E-Commerce Price Tracker + Scraper
                </h3>
                <p class="font-inter">
                  In progress developing web companion that can target commerce
                  sites to generate specific product trend analysis with seaborn.
                </p>
              </div>
            </div>
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