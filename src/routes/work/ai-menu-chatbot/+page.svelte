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
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[600px]">
            An intelligent AI-powered ordering system that transforms the Chipotle ordering experience into a fully autonomous process.
          </p>
        </div>
        
        <!-- Project Content Area -->
        <div class="flex justify-center">
          <div class="w-full max-w-[1000px] bg-[#FAFAFA] rounded-2xl p-8 mb-[60px]">
            <h2 class="text-[#2D2D2D] text-2xl font-inter font-bold mb-6">
              Project Overview
            </h2>
            <div class="space-y-6">
              <p class="text-[#666666] font-inter leading-relaxed">
                The Chipotle AI Menu system represents a breakthrough in automated food service technology. 
                By leveraging advanced natural language processing and machine learning algorithms, this system 
                can understand customer preferences, dietary restrictions, and ordering patterns to create a 
                seamless, personalized ordering experience.
              </p>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-[#2D2D2D] text-lg font-inter font-semibold mb-3">Key Features</h3>
                  <ul class="text-[#666666] font-inter space-y-2 list-disc list-inside">
                    <li>Natural language order processing</li>
                    <li>Dietary preference recognition</li>
                    <li>Personalized menu recommendations</li>
                    <li>Real-time inventory integration</li>
                    <li>Voice and text input support</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-[#2D2D2D] text-lg font-inter font-semibold mb-3">Technology Stack</h3>
                  <ul class="text-[#666666] font-inter space-y-2 list-disc list-inside">
                    <li>Python & TensorFlow</li>
                    <li>Natural Language Processing</li>
                    <li>REST API Integration</li>
                    <li>Cloud-based deployment</li>
                    <li>Real-time data processing</li>
                  </ul>
                </div>
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