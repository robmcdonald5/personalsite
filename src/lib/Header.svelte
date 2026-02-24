<!-- src/lib/Header.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
</script>

<header class="w-full max-w-[1440px] h-[60px] lg:h-[90px]
               flex items-center
               px-[5%] lg:px-[180px]
               mx-auto">
  <!-- Logo -->
  <a href="/" class="flex items-center" aria-label="Home">
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
             {$page.url.pathname === '/about' ? 'text-primary' : 'text-white hover:text-primary'}"
      >about</a
    >
    <a
      href="/work"
      class="text-[16px] lg:text-[26px] font-inter font-light transition-colors
             {$page.url.pathname === '/work' ? 'text-primary' : 'text-white hover:text-primary'}"
      >work</a
    >
    <a
      href="/contact"
      class="text-[16px] lg:text-[26px] font-inter font-light transition-colors
             {$page.url.pathname === '/contact' ? 'text-primary' : 'text-white hover:text-primary'}"
      >contact</a
    >
  </nav>

  <!-- Social Icons -->
  <div class="flex items-center gap-[12px] lg:gap-[16px]">
    <a href="https://github.com/robmcdonald5" target="_blank" rel="noopener" aria-label="GitHub profile">
      <img
        src="/header__external-icon-github.svg"
        alt="GitHub"
      />
    </a>
  </div>
</header>