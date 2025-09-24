<script lang="ts">
let animationKey = $state(0);
let previousResetTrigger = $state(-1);
$effect(() => {
    if (resetTrigger !== previousResetTrigger && resetTrigger !== -1) {
        previousResetTrigger = resetTrigger;
        animationKey = Date.now(); // force re‑render to restart animation
    } else if (resetTrigger === -1) {
        previousResetTrigger = resetTrigger; // stop animation
    }
});
</script>
