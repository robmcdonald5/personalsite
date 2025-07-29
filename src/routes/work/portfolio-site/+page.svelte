<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import WasmDemo from '$lib/WasmDemo.svelte';
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
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[40px] lg:py-[80px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-3 lg:gap-4 mb-[40px] lg:mb-[60px]">
          <h1 class="text-[#2D2D2D] text-[28px] lg:text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
            My Portfolio Site
          </h1>
          <p class="text-[#2D2D2D] text-sm lg:text-lg font-inter text-center max-w-[650px] px-4 lg:px-0">
            My personal portfolio site (this site) made with SvelteKit hosted on Vercel. UI elements are compiled with Wasm for performance, with contact forms powered by Formspark and Turnstile CAPTCHA protection.
          </p>
        </div>

        <!-- Showcase Display -->
        <div class="w-full flex justify-center mb-8 lg:mb-16 px-4 lg:px-0">
          <div class="w-full max-w-[1080px] bg-[#F3F4F6] rounded-2xl relative overflow-hidden">
            <!-- Mobile: Simple vertical layout, Desktop: Complex absolute positioning -->
            <div class="flex flex-col lg:block p-6 lg:p-0 min-h-[300px] lg:h-[460px]">
              <!-- Background Geometric Element - Desktop only -->
              <div class="hidden lg:block absolute left-[68px] top-[0px]">
                <img 
                  src="/showcase__background-icon.svg" 
                  alt="Background geometric element" 
                  class="w-[135px] h-[155px]"
                  onerror={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              
              <!-- Main Content Text -->
              <div class="w-full lg:w-[469px] lg:h-[191px] flex flex-col gap-4 lg:gap-6 lg:absolute lg:left-[60px] lg:top-[90px] mb-6 lg:mb-0">
                <div class="text-[#2D2D2D] text-[24px] lg:text-[42px] font-inter font-bold text-center lg:text-left">
                  Built with SvelteKit + WebAssembly
                </div>
                <div class="text-[#4B5563] text-sm lg:text-lg font-inter text-center lg:text-left">
                  Leverages modern web framework for clean scalability. UI elements are compiled with WebAssembly using Rust for quick loading and rendering. Scroll down for a live demo.
                </div>
              </div>

              <!-- Code Block -->
              <div class="w-full lg:w-[234px] lg:h-[146px] flex justify-center items-center py-4 lg:py-[17px] px-4 bg-[#282C34] rounded-lg lg:absolute lg:left-[669px] lg:top-[159.17px] lg:z-10 mb-4 lg:mb-0 lg:transform lg:rotate-[-2deg]">
                <div class="text-[10px] lg:text-xs font-roboto-mono font-light">
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

              <!-- Feature Cards - Mobile: Horizontal flex, Desktop: Absolute positioning -->
              <div class="flex flex-row lg:block gap-4 lg:gap-0 justify-center lg:justify-start">
                <!-- SvelteKit Feature Card -->
                <div class="w-[140px] lg:w-[180px] h-[140px] lg:h-[180px] flex flex-col justify-center items-center py-3 lg:py-[18px] px-4 lg:px-[37px] bg-[#FFFFFF] rounded-xl lg:absolute lg:left-[560.5px] lg:top-[106.19px] lg:z-20 lg:transform lg:rotate-[-5deg]">
                  <div class="flex flex-col items-center justify-center gap-1 lg:gap-2 w-full h-full">
                    <div class="flex justify-center items-center">
                      <img 
                        src="/tech-stack__sveltekit-icon.svg" 
                        alt="SvelteKit" 
                        class="w-[40px] lg:w-[50px] h-[48px] lg:h-[60px]"
                        onerror={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div class="text-center">
                      <div class="text-[#2D2D2D] text-sm lg:text-lg font-inter font-semibold">
                        SvelteKit
                      </div>
                      <p class="text-[#6B7280] text-xs lg:text-sm font-inter font-light">
                        Frontend Framework
                      </p>
                    </div>
                  </div>
                </div>

                <!-- WebAssembly Feature Card -->
                <div class="w-[140px] lg:w-[180px] h-[140px] lg:h-[180px] flex flex-col justify-center items-center py-3 lg:py-[18px] px-4 lg:px-[37px] bg-[#FFFFFF] rounded-xl lg:absolute lg:left-[836.69px] lg:top-[171px] lg:z-20 lg:transform lg:rotate-[5deg]">
                  <div class="flex flex-col items-center justify-center gap-1 lg:gap-2 w-full h-full">
                    <div class="flex justify-center items-center">
                      <img 
                        src="/tech-stack__wasm-icon.svg" 
                        alt="WebAssembly" 
                        class="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]"
                        onerror={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div class="text-center">
                      <div class="text-[#2D2D2D] text-sm lg:text-lg font-inter font-semibold">
                        WebAssembly
                      </div>
                      <p class="text-[#6B7280] text-xs lg:text-sm font-inter font-light">
                        Compiled from Rust
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tech Stack Showcase -->
        <div class="w-full flex justify-center mt-8 lg:mt-16 px-4 lg:px-0">
          <div class="grid py-[20px] lg:py-[25px] px-[20px] lg:px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-1 lg:grid-cols-4 grid-rows-auto lg:grid-rows-3 gap-x-2 lg:gap-x-4 gap-y-3">
            <!-- Title - positioned in grid -->
            <div class="text-[#2D2D2D] text-[20px] lg:text-[26px] font-inter text-center font-semibold col-span-1 lg:col-span-4 row-span-1 mb-2 lg:mb-0">
              Technology Stack
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- SvelteKit -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[114px] lg:pl-4 bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__sveltekit-icon.svg" alt="SvelteKit" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">SvelteKit</div>
            </div>
            
            <!-- Vercel -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[135px] lg:pl-[9px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__vercel-icon.svg" alt="Vercel" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Vercel</div>
            </div>
            
            <!-- Formspark -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[105px] lg:pl-[18px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__formspark-icon.svg" alt="Formspark" class="w-[25px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Formspark</div>
            </div>
            
            <!-- Rust -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[148px] lg:pl-[11px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__rust-icon.svg" alt="Rust" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Rust</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- WebAssembly -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[74px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__wasm-icon.svg" alt="WebAssembly" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">WebAssembly</div>
            </div>
            
            <!-- Turnstile -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[115px] lg:pl-[18px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__turnstile-icon.svg" alt="Turnstile" class="w-[25px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Turnstile</div>
            </div>
            
            <!-- TypeScript -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[105px] lg:pl-[18px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__typescript-icon.svg" alt="TypeScript" class="w-[25px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">TypeScript</div>
            </div>
            
            <!-- Playwright -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[110px] lg:pl-[18px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__playwright-icon.svg" alt="Playwright" class="w-[25px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Playwright</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>

    <!-- WASM Demo Section -->
    <div class="w-full bg-[#FAFAFA] flex justify-center">
      <WasmDemo />
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>