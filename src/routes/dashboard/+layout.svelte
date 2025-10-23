<script lang="ts">
    let { children, data } = $props();
</script>

{data.user.name}
<!-- <a href=""></a> -->
{@render children?.()}