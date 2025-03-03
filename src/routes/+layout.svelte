<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/auth">auth</a>
</nav>

{@render children()}
