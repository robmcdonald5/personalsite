<script lang="ts">
import { onMount, tick } from 'svelte';
interface Props {
    target?: Element | string;
    children?: import('svelte').Snippet;
}
let { target = 'body', children }: Props = $props();
let portal: Element;
let mounted = $state(false);
onMount(async () => {
    await tick();
    portal = typeof target === 'string'
        ? document.querySelector(target) ?? document.body
        : target;
    mounted = true;
});
</script>
{#if mounted && portal}
    {@render children?.()}
{/if}
