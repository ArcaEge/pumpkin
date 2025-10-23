<script lang="ts">
	let { children, data } = $props();
</script>

<div class="box-border flex h-[100svh] flex-row">
	<div class="m-5 bg-amber-950 w-60">
        <div class="flex flex-col gap-1">
            <div>
                {data.user.name}
            </div>
            <div>
                <a href="/auth/logout">Logout</a>
            </div>
        </div>
	</div>
	<div class="grow overflow-auto">
		{@render children?.()}
        
        a<br/>
	</div>
</div>
