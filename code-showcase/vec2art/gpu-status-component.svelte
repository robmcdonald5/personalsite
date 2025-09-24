<script lang="ts">
import { onMount } from 'svelte';
import { gpuService, type GpuCapabilities } from '$lib/services/gpu-service';
let capabilities: GpuCapabilities | null = $state(null);
let loading = $state(true);
let error = $state<string | null>(null);
let performanceSummary = $state('');
onMount(async () => {
    try {
        await gpuService.initialize();
        capabilities = await gpuService.getCapabilities();
        performanceSummary = gpuService.getPerformanceSummary();
        loading = false;
    } catch (e) {
        error = e instanceof Error ? e.message : String(e);
        loading = false;
    }
});
</script>
{#if loading}
    Loading GPU status...
{:else if error}
    Error: {error}
{:else if capabilities}
    Status: {capabilities.available ? 'Available' : 'Not Available'}
    Backend: {capabilities.backend}
    Image&nbsp;Processing: {capabilities.supports_image_processing ? 'Supported' : 'Not Supported'}
{/if}
