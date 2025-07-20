<!-- src/lib/Header.svelte -->
<script>
  // any script you had here (none needed for static header)
</script>

<header class="w-full max-w-[1440px] h-[90px]
               flex items-center justify-between
               px-[5%] md:px-[180px]
               mx-auto">
  <!-- Logo -->
  <a href="/" class="flex items-center">
    <img
      src="/header__logo-icon.svg"
      alt="Logo"
      class="cursor-pointer"
    />
  </a>

  <!-- Navigation -->
  <nav class="flex items-center gap-[16px] md:gap-[48px]">
    <a
      href="/about"
      class="text-[#FFFFFF] text-[20px] md:text-[26px]
             font-inter font-light
             hover:text-[#4A90E2] transition-colors"
      >about</a
    >
    <a
      href="/work"
      class="text-[#FFFFFF] text-[20px] md:text-[26px]
             font-inter font-light
             hover:text-[#4A90E2] transition-colors"
      >work</a
    >
    <a
      href="/contact"
      class="text-[#FFFFFF] text-[20px] md:text-[26px]
             font-inter font-light"
      >contact</a
    >
  </nav>

  <!-- Social Icons -->
  <div class="flex items-center gap-[16px]">
    <a href="https://github.com/yourusername" target="_blank" rel="noopener">
      <img
        src="/header__external-icon-github.svg"
        alt="GitHub"
      />
    </a>
    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener">
      <img
        src="/header__external-icon-linkedin.svg"
        alt="LinkedIn"
      />
    </a>
  </div>
</header>