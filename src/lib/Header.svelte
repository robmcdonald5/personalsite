<!-- src/lib/Header.svelte -->
<script>
  import { page } from '$app/stores';
</script>

<header class="w-full max-w-[1440px] h-[60px] lg:h-[90px]
               flex items-center
               px-[5%] lg:px-[180px]
               mx-auto">
  <!-- Logo -->
  <a href="/" class="flex items-center">
    <img
      src="/header__logo-icon.svg"
      alt="Logo"
      class="cursor-pointer"
    />
  </a>

  <!-- Spacer to push content right -->
  <div class="flex-1"></div>

  <!-- Navigation -->
  <nav class="flex items-center gap-[12px] lg:gap-[48px] mr-[16px] lg:mr-[64px]">
    <a
      href="/about"
      class="text-[16px] lg:text-[26px] font-inter font-light transition-colors
             {$page.url.pathname === '/about' ? 'text-[#4A90E2]' : 'text-[#FFFFFF] hover:text-[#4A90E2]'}"
      >about</a
    >
    <a
      href="/work"
      class="text-[16px] lg:text-[26px] font-inter font-light transition-colors
             {$page.url.pathname === '/work' ? 'text-[#4A90E2]' : 'text-[#FFFFFF] hover:text-[#4A90E2]'}"
      >work</a
    >
    <a
      href="/contact"
      class="text-[16px] lg:text-[26px] font-inter font-light transition-colors
             {$page.url.pathname === '/contact' ? 'text-[#4A90E2]' : 'text-[#FFFFFF] hover:text-[#4A90E2]'}"
      >contact</a
    >
  </nav>

  <!-- Social Icons -->
  <div class="flex items-center gap-[12px] lg:gap-[16px]">
    <a href="https://github.com/robmcdonald5" target="_blank" rel="noopener">
      <img
        src="/header__external-icon-github.svg"
        alt="GitHub"
      />
    </a>
    <a href="https://www.linkedin.com/in/joshua-mcdonald-45a39a215/" target="_blank" rel="noopener">
      <img
        src="/header__external-icon-linkedin.svg"
        alt="LinkedIn"
      />
    </a>
  </div>
</header>