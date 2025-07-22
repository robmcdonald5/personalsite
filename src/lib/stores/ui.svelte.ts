// Modern Svelte 5 shared state using runes
// This demonstrates best practice for global state management

// Theme state (could be expanded for dark mode)
export const theme = $state({
  current: 'light' as 'light' | 'dark',
  systemPreference: 'light' as 'light' | 'dark'
});

// Navigation state
export const navigation = $state({
  isMenuOpen: false,
  activeSection: '' as string
});

// Demo state (if you wanted to share WASM demo state across components)
export const wasmDemo = $state({
  isInitialized: false,
  isSupported: true,
  lastError: null as string | null
});

// Derived computations
export const isDarkMode = $derived(theme.current === 'dark');
export const shouldShowMobileMenu = $derived(navigation.isMenuOpen);

// Actions (functions that modify state)
export function toggleTheme() {
  theme.current = theme.current === 'light' ? 'dark' : 'light';
}

export function setActiveSection(section: string) {
  navigation.activeSection = section;
}

export function toggleMobileMenu() {
  navigation.isMenuOpen = !navigation.isMenuOpen;
}

export function updateWasmStatus(isSupported: boolean, error?: string) {
  wasmDemo.isSupported = isSupported;
  wasmDemo.lastError = error || null;
  wasmDemo.isInitialized = true;
}