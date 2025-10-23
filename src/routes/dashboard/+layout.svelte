<script lang="ts">
    let { children, data } = $props();
</script>

{data.user.name}
<a href="/auth/logout">Logout</a>
{@render children?.()}