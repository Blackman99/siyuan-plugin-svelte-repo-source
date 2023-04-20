<script>
	import Repl from '$lib/index.svelte';
	import { onMount } from 'svelte';
	import '@sveltejs/site-kit/styles/index.css';
	import '@sveltejs/site-kit/styles/code.css';
	import { updateAttr } from '$lib/api';

	const DEFAULT_REPL_STATES =  JSON.stringify([
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
			])

	let repl;
	const ATTR_KEY = 'custom-Svelte-REPL'

	const getBlockEl = () => window.frameElement?.parentElement?.parentElement

	const getReplState = () => {
		const blockNodeEl = getBlockEl()
		if(!blockNodeEl) {
			return DEFAULT_REPL_STATES
		}
		return blockNodeEl.getAttribute(ATTR_KEY) || DEFAULT_REPL_STATES
	}

	onMount(() => {
		const initialComponents = JSON.parse(getReplState())
		repl.set({
			components: initialComponents
		});
	});

	const handleReplChange = (changedComponents) => {
		const blockEl = getBlockEl()
		if(blockEl) {
			updateAttr(blockEl.dataset.nodeId, {
				[ATTR_KEY]: JSON.stringify(changedComponents.detail.components)
			})
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
