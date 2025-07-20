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

  <main class="flex-grow">
    <!-- About Hero Section -->
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[90px]">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <div class="grid md:grid-cols-2 gap-[90px] md:h-[315px]">
          <!-- About Text Content - Left Side -->
          <div class="flex flex-col gap-[29px] max-w-[500px] md:self-center">
            <h1 class="text-[#2D2D2D] text-[56px] font-inter font-bold tracking-[-1.12px]">
              about
            </h1>
            <p class="text-[#4B4B4B] font-inter font-light text-lg">
              I'm a software engineer and AI<br />
              enthusiast based in Texas.
            </p>
            <p class="text-[#000000] text-sm font-inter font-extralight max-w-[450px]">
              I've been working with and building software systems for most of my
              life. Currently I am focused on making AI applications — blending
              creativity, efficiency, and elegance.
            </p>
          </div>
          
          <!-- Profile Image - Right Side, Bottom Aligned -->
          <div class="w-[228px] h-[315px] bg-cover bg-center justify-self-end md:self-end" style="background-image: url(/hero__headshot.png)"></div>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>

    <!-- Content Section -->
    <div class="w-full bg-[#FAFAFA] flex justify-center py-[90px]">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-[27px] gap-y-[76px]">
          <!-- Experience Column -->
          <div class="flex flex-col gap-6">
            <h2 class="text-[#4B4B4B] text-[28px] font-inter font-bold tracking-[-0.56px]">
              Experience
            </h2>
            <div class="text-[#2D2D2D] font-inter">
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
          <div class="flex flex-col gap-6">
            <h2 class="text-[#4B4B4B] text-[28px] font-inter font-bold tracking-[-0.56px]">
              Expertise
            </h2>
            <div class="text-[#2D2D2D] font-inter space-y-4">
              <div>Machine Learning & Deep Learning</div>
              <div>NLP Processing & Training</div>
              <div>Scientific Stack Python Libraries</div>
              <div>Intent Training & Chatbot Design</div>
              <div>Docker + Containerized Deployments</div>
              <div>REST API Integration</div>
              <div>Git & CI/CD Pipelines</div>
              <div>MongoDB, Postgres, supabase</div>
              <div>Server Deployment & Virtualization</div>
            </div>
          </div>

          <!-- Recent Projects Column -->
          <div class="flex flex-col gap-6">
            <h2 class="text-[#4B4B4B] text-[28px] font-inter font-bold tracking-[-0.56px]">
              Recent Projects
            </h2>
            <div class="text-[#2D2D2D] space-y-6">
              <div>
                <h3 class="text-lg font-inter font-semibold mb-2">
                  Chipotle AI Ordering System
                </h3>
                <p class="font-inter">
                  Project lead and designer for an AI based ordering system that
                  turns Chipotle ordering fully autonomous.
                </p>
              </div>
              
              <div>
                <h3 class="text-lg font-inter font-semibold mb-2">
                  Path of Exile Market Analyzer
                </h3>
                <p class="font-inter">
                  In progress developing web app + newsletter that utilizes PoE's
                  API backend to do market trend analysis and reports for users.
                </p>
              </div>
              
              <div>
                <h3 class="text-lg font-inter font-semibold mb-2">
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