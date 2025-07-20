<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // Svelte 5 runes for dropdown state management
  let openDropdown = $state(null);
  
  // Project categories data
  const categories = [
    { name: 'Scripting', count: 3, position: { row: 9, col: 2 } },
    { name: 'Automation', count: 2, position: { row: 9, col: 1 } },
    { name: 'NLP', count: 2, position: { row: 7, col: 3 } },
    { name: 'Machine Learning', count: 3, position: { row: 7, col: 2 } },
    { name: 'Database', count: 3, position: { row: 7, col: 1 } },
    { name: 'Python', count: 4, position: { row: 5, col: 3 } },
    { name: 'Websites', count: 5, position: { row: 5, col: 2 } },
    { name: 'Chatbots', count: 2, position: { row: 5, col: 1 } }
  ];
  
  function toggleDropdown(categoryName) {
    openDropdown = openDropdown === categoryName ? null : categoryName;
  }
</script>

<svelte:head>
  <title>Work - Joshua McDonald</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
  <header class="w-full bg-[#111111] flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- Hero Section -->
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[100px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-6 mb-[75px]">
          <h1 class="text-[#2D2D2D] text-[64px] font-inter font-bold tracking-[-1.28px] text-center">
            My Work
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center">
            Explore snippets of the work I've done over my development career.
          </p>
        </div>

        <!-- Navigate Projects Button -->
        <div class="flex justify-center mb-[75px]">
          <button 
            class="flex items-center gap-1 py-3 px-7 bg-[#4A90E2] rounded-2xl hover:bg-[#3A7BC8] transition-colors"
            onclick={() => toggleDropdown('navigate')}
          >
            <span class="text-[#FFFFFF] text-lg font-inter font-semibold">
              Navigate Projects
            </span>
            <img src="/dropdown__icon.png" alt="dropdown icon" class="w-4 h-4" />
          </button>
        </div>

        <!-- Project Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-[27px] md:gap-x-[75px] gap-y-[75px] max-w-[1080px] mx-auto">
          {#each categories as category}
            <div class="w-full max-w-[300px] mx-auto">
              <button 
                class="w-full h-[120px] flex items-center p-6 bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl hover:bg-[#F0F0F0] transition-colors"
                onclick={() => toggleDropdown(category.name)}
              >
                <div class="flex flex-col items-start w-full">
                  <div class="flex items-center justify-between w-full mb-2">
                    <h3 class="text-[#000000] text-2xl font-inter font-bold">
                      {category.name}
                    </h3>
                    <img src="/dropdown__icon.png" alt="dropdown icon" class="w-4 h-4" />
                  </div>
                  <p class="text-[#666666] font-inter text-sm">
                    {category.count} Project{category.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </button>
              
              <!-- Dropdown Content (placeholder for now) -->
              {#if openDropdown === category.name}
                <div class="mt-2 p-4 bg-white border border-[#EAEAEA] rounded-xl shadow-lg">
                  <p class="text-sm text-[#666666]">
                    Projects for {category.name} will be listed here.
                  </p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </section>
    </div>
    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>