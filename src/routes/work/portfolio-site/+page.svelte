<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>My Portfolio Site - Joshua McDonald</title>
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
            My Portfolio Site
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[650px]">
            My personal portfolio site (this site) made with SvelteKit hosted on Vercel. UI elements are compiled with Wasm for performance and deployed on Vercel.
          </p>
        </div>

        <!-- Showcase Display -->
        <div class="w-full flex justify-center mb-16">
          <div class="w-[1080px] h-[460px] bg-[#F3F4F6] rounded-2xl relative">
            <!-- Background Geometric Element -->
            <div class="absolute left-[68px] top-[0px]">
              <img 
                src="/showcase__background-geo.svg" 
                alt="Background geometric element" 
                class="w-[135px] h-[155px]"
                onerror={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            
            <!-- Main Content Text -->
            <div class="w-[469px] h-[191px] flex flex-col gap-6 absolute left-[60px] top-[90px]">
              <div class="text-[#2D2D2D] text-[42px] font-inter font-bold">
                Built with SvelteKit + WebAssembly
              </div>
              <div class="text-[#4B5563] text-lg font-inter">
                Leverages modern web framework for clean scalability. UI elements are compiled with WebAssembly using Rust for quick loading and rendering.
              </div>
            </div>

            <!-- SvelteKit Feature Card -->
            <div 
              class="w-[180px] h-[180px] flex flex-col justify-center items-center py-[18px] px-[37px] bg-[#FFFFFF] rounded-xl absolute left-[560.5px] top-[106.19px]"
              style="transform: rotate(-5deg)"
            >
              <div>
                <img 
                  src="/showcase__sveltekit-icon.svg" 
                  alt="SvelteKit" 
                  class="w-[43px] h-[52px]"
                  onerror={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div class="flex justify-center items-center p-2.5">
                <span class="text-[#2D2D2D] text-lg font-inter text-center font-semibold">
                  SvelteKit
                </span>
              </div>
              <div class="flex justify-center items-center p-2.5">
                <p class="text-[#6B7280] text-sm font-inter text-center font-light">
                  Frontend Framework
                </p>
              </div>
            </div>

            <!-- Code Block -->
            <div 
              class="w-[234px] h-[146px] flex justify-center items-center py-[17px] px-4 bg-[#282C34] rounded-lg absolute left-[669px] top-[159.17px]"
              style="transform: rotate(-2deg)"
            >
              <div class="text-xs font-roboto-mono font-light" style="transform: rotate(0deg)">
                <div class="text-[#5C6370]">// Svelte component</div>
                <div>
                  <span class="text-[#C678DD]">import</span>
                  <span class="text-[#ABB2BF]"> {'{ wasm }'}</span>
                </div>
                <div>
                  <span class="text-[#C678DD]">from</span>
                  <span class="text-[#ABB2BF]"> </span>
                  <span class="text-[#98C379]">'./rust_module'</span>
                  <span class="text-[#ABB2BF]">;</span>
                </div>
                <div>
                  <span class="text-[#C678DD]">let</span>
                  <span class="text-[#ABB2BF]"> result = </span>
                  <span class="text-[#61AFEF]">wasm.process</span>
                  <span class="text-[#ABB2BF]">();</span>
                </div>
                <div>
                  <span class="text-[#C678DD]">function</span>
                  <span class="text-[#ABB2BF]"> </span>
                  <span class="text-[#61AFEF]">handleClick</span>
                  <span class="text-[#ABB2BF]">() {'{'}</span>
                </div>
                <div class="ml-3">
                  <span class="text-[#ABB2BF]">result = </span>
                  <span class="text-[#61AFEF]">wasm.compute</span>
                  <span class="text-[#ABB2BF]">();</span>
                </div>
                <div class="text-[#ABB2BF]">{'}'}</div>
              </div>
            </div>

            <!-- WebAssembly Feature Card -->
            <div 
              class="w-[180px] h-[180px] flex flex-col justify-center items-center py-[18px] px-[37px] bg-[#FFFFFF] rounded-xl absolute left-[836.69px] top-[171px]"
              style="transform: rotate(5deg)"
            >
              <div>
                <img 
                  src="/showcase__wasm-icon.svg" 
                  alt="WebAssembly" 
                  class="w-[45px] h-[45px]"
                  onerror={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div class="flex justify-center items-center p-2.5">
                <span class="text-[#2D2D2D] text-lg font-inter text-center font-semibold">
                  WebAssembly
                </span>
              </div>
              <div class="flex justify-center items-center p-2.5">
                <p class="text-[#6B7280] text-sm font-inter text-center font-light">
                  Compiled from Rust
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tech Stack Showcase -->
        <div class="w-full flex justify-center mt-16">
          <div class="grid py-[25px] px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-4 grid-rows-3 gap-x-4 gap-y-3">
            <!-- Title - positioned in grid -->
            <div class="text-[#2D2D2D] text-[26px] font-inter text-center font-semibold col-span-1 row-span-1">
              Technology Stack
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- SvelteKit -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 pt-3 pb-3 pr-[114px] pl-4 bg-[#F9FAFB] rounded-lg col-start-1 row-start-2">
              <div>
                <img src="/tech-stack__sveltekit-icon.svg" alt="SvelteKit" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">SvelteKit</div>
            </div>
            
            <!-- Vercel -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[135px] pl-[9px] bg-[#F9FAFB] rounded-lg col-start-2 row-start-2">
              <div>
                <img src="/tech-stack__vercel-icon.svg" alt="Vercel" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Vercel</div>
            </div>
            
            <!-- Formspree -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[101px] pl-[18px] bg-[#F9FAFB] rounded-lg col-start-3 row-start-2">
              <div>
                <img src="/tech-stack__formspree-icon.svg" alt="Formspree" class="w-[25px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Formspree</div>
            </div>
            
            <!-- Rust -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[148px] pl-[11px] bg-[#F9FAFB] rounded-lg col-start-4 row-start-2">
              <div>
                <img src="/tech-stack__rust-icon.svg" alt="Rust" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Rust</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- WebAssembly -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[74px] pl-[13px] bg-[#F9FAFB] rounded-lg col-start-1 row-start-3">
              <div>
                <img src="/tech-stack__wasm-icon.svg" alt="WebAssembly" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">WebAssembly</div>
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