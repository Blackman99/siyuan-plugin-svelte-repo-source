<script>
	import Repl from '$lib/index.svelte';
	import { onMount } from 'svelte';
	import '@sveltejs/site-kit/styles/index.css';
	import '@sveltejs/site-kit/styles/code.css';

	let repl;
	onMount(() => {
		console.log(window.document);
		const initialComponents = JSON.parse(window.frameElement?.parentElement?.parentElement?.dataset.svelteRepl || JSON.stringify([
				{
					name: 'App',
					type: 'svelte',
					source:
						`<scr` +
						`ipt>
	let name = 'world';
</scr` +
						`ipt>

<h1>Hello {name}!</h1>`
				}
			]))
		repl.set({
			components: initialComponents
		});
	});

	const handleReplChange = (changedComponents) => {
		console.log({ changedComponents });
		const nodeEl = window.frameElement?.parentElement?.parentElement
		if(nodeEl) {
			nodeEl.dataset.svelteRepl = JSON.stringify(changedComponents.detail.components)
		}
	}

</script>

<main>
	<Repl bind:this={repl} on:change={handleReplChange} />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		height: 100vh;
	}
</style>
