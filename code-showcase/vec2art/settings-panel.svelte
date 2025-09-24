<script lang="ts">
    import { algorithmConfigStore } from '$lib/stores/algorithm-config-store.svelte';

    // UI state for panel expansion with localStorage persistence
    let isQuickSettingsExpanded = $state(loadPanelState('isQuickSettingsExpanded', true));
    let isAdvancedSettingsExpanded = $state(loadPanelState('isAdvancedSettingsExpanded', false));

    // Detect mobile view with debounced resize handler
    let isMobile = $state(false);
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    $effect(() => {
        if (typeof window === 'undefined') return;
        const checkMobile = () => { isMobile = window.innerWidth <= 768; };
        const handleResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkMobile, 150);
        };
        checkMobile();
        window.addEventListener('resize', handleResize);
        return () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    });

    // Update stroke width; for dots backend, update min/max radius to maintain proportionality
    function updateStrokeWidth(value: number) {
        if (currentAlgorithm === 'dots') {
            algorithmConfigStore.updateConfig('dots', {
                strokeWidth: value,
                minRadius: Math.max(0.1, value * 0.3),
                dotMinRadius: Math.max(0.1, value * 0.3),
                maxRadius: Math.min(20.0, value * 1.5),
                dotMaxRadius: Math.min(20.0, value * 1.5),
            });
        } else {
            algorithmConfigStore.updateConfig(currentAlgorithm, { strokeWidth: value });
        }
    }

    // Preserve colors update – different backends use different property names
    function updatePreserveColors(value: boolean) {
        const colorProperty =
            currentAlgorithm === 'edge' || currentAlgorithm === 'centerline'
                ? 'linePreserveColors'
                : currentAlgorithm === 'superpixel'
                    ? 'superpixelPreserveColors'
                    : currentAlgorithm === 'dots'
                        ? 'dotPreserveColors'
                        : 'preserveColors';
        const updates: Record<string, any> = { [colorProperty]: value };
        // Also sync to generic preserveColors for backward compatibility
        if (colorProperty !== 'preserveColors') updates.preserveColors = value;
        algorithmConfigStore.updateConfig(currentAlgorithm, updates);
    }
</script>
