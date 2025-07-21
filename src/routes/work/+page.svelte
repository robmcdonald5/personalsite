<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // Svelte 5 runes for dropdown state management
  let openDropdown = $state(null);
  
  // Project categories data
  const categories = [
    { name: 'Chatbots', count: 2, position: { row: 5, col: 1 } },
    { name: 'Websites', count: 5, position: { row: 5, col: 2 } },
    { name: 'Python', count: 4, position: { row: 5, col: 3 } },
    { name: 'Database', count: 3, position: { row: 7, col: 1 } },
    { name: 'Machine Learning', count: 4, position: { row: 7, col: 2 } },
    { name: 'NLP', count: 2, position: { row: 7, col: 3 } },
    { name: 'Automation', count: 2, position: { row: 9, col: 1 } },
    { name: 'Scripting', count: 3, position: { row: 9, col: 2 } }
  ];
  
  // @ts-ignore
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
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[80px] flex-grow">
      <section class="w-full max-w-[1440px] !px-[5%] md:!px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-4 mb-[60px]">
          <h1 class="text-[#2D2D2D] text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
            My Work
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[600px]">
            Explore snippets of the work I've done over my development career.
          </p>
        </div>
        
        <!-- Navigate Projects Button -->
        <div class="flex justify-center mb-[80px]">
          <button 
            class="flex items-center gap-2 py-3 px-6 bg-[#4A90E2] rounded-2xl hover:bg-[#3A7BC8] transition-colors"
            onclick={() => toggleDropdown('navigate')}
          >
            <span class="text-[#FFFFFF] text-base font-inter font-semibold">
              Navigate Projects
            </span>
            <img src="/dropdown__icon.svg" alt="dropdown icon" class="w-4 h-4" />
          </button>
        </div>
        
        <!-- Project Categories Grid -->
        <div class="flex justify-center items-center min-h-[400px]">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-x-[27px] gap-y-[75px] max-w-[981px] w-full px-4 md:px-0">
          {#each categories as category}
            <div class="w-full max-w-[300px] mx-auto relative">
              <button
                class="w-full max-w-[300px] h-[120px] flex items-center justify-between !pl-[40px] pr-6 py-6 bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl hover:bg-[#F0F0F0] transition-colors"
                onclick={() => toggleDropdown(category.name)}
              >
                <div class="flex flex-col items-start">
                  <div class="flex items-baseline gap-2">
                    <h3 class="text-[#000000] text-xl font-inter font-semibold">
                      {category.name}
                    </h3>
                    <img 
                      src="/dropdown__icon.svg" 
                      alt="dropdown icon" 
                      class="w-4 h-4 flex-shrink-0 transition-transform {openDropdown === category.name ? 'rotate-180' : ''}"
                    />
                  </div>
                  <p class="text-[#666666] font-inter text-sm">
                    {category.count} Project{category.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </button>
                          
              <!-- Dropdown Content -->
              {#if openDropdown === category.name}
                {#if category.name === 'Chatbots'}
                  <!-- Chatbots Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[239px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Chatbots
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          2 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Chipotle AI Menu</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">AI Creative Writing Assistant</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'Websites'}
                  <!-- Websites Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[419px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Websites
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          5 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">My Portfolio Site</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Path of Exile Market Analyzer</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">AI Creative Writing Assistant</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Dune Spice Wars Wiki</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Chipotle AI Menu</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'Python'}
                  <!-- Python Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[359px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Python
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          4 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Chipotle AI Menu</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">AI Creative Writing Assistant</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Path of Exile Market Analyzer</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">E-Commerce Price Tracker</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'Database'}
                  <!-- Database Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[299px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Database
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          3 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">AI Creative Writing Assistant</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">E-Commerce Price Tracker</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Path of Exile Market Analyzer</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'Machine Learning'}
                  <!-- Machine Learning Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[359px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Machine Learning
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          4 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Chipotle AI Menu</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">AI Creative Writing Assistant</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">E-Commerce Price Tracker</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Path of Exile Market Analyzer</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'NLP'}
                  <!-- NLP Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[239px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            NLP
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          2 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Chipotle AI Menu</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">AI Creative Writing Assistant</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'Automation'}
                  <!-- Automation Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[239px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Automation
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          2 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">E-Commerce Price Tracker</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Path of Exile Market Analyzer</span>
                      </button>
                    </div>
                  </div>
                {:else if category.name === 'Scripting'}
                  <!-- Scripting Dropdown -->
                  <div
                    class="absolute top-0 left-0 w-[300px] h-[299px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <!-- Header section with title and icon -->
                    <div class="relative h-[119px] bg-[#FFFFFF] rounded-t-2xl flex items-center justify-between !pl-[40px] pr-6">
                      <div class="flex flex-col items-start">
                        <div class="flex items-baseline gap-2">
                          <h3 class="text-[#000000] text-xl font-inter font-semibold">
                            Scripting
                          </h3>
                          <img 
                            src="/dropdown__icon.svg" 
                            alt="dropdown icon" 
                            class="w-4 h-4 flex-shrink-0 transform rotate-180" 
                          />
                        </div>
                        <p class="text-[#666666] font-inter text-sm">
                          3 Projects
                        </p>
                      </div>
                    </div>
                    
                    <!-- Project items -->
                    <div class="flex flex-col">
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Chipotle AI Menu</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">E-Commerce Price Tracker</span>
                      </button>
                      <button 
                        class="w-[300px] h-[60px] flex items-center justify-between py-[19px] !pl-[40px] pr-6 bg-[#FAFAFA] hover:bg-[#F0F0F0] transition-colors rounded-b-2xl text-left"
                        onclick={(e) => { e.stopPropagation(); /* Handle project click */ }}
                      >
                        <span class="text-[#666666] font-inter">Path of Exile Market Analyzer</span>
                      </button>
                    </div>
                  </div>
                {:else}
                  <!-- Fallback placeholder -->
                  <div
                    class="absolute top-[122px] left-0 w-[300px] p-4 bg-white border border-[#EAEAEA] rounded-xl shadow-lg z-10"
                    role="button"
                    tabindex="0"
                    onclick={() => toggleDropdown(category.name)}
                    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(category.name); } }}
                    aria-label={`Close ${category.name} dropdown`}
                  >
                    <p class="text-sm text-[#666666]">
                      Projects for {category.name} will be listed here.
                    </p>
                  </div>
                {/if}
              {/if}
            </div>
          {/each}
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