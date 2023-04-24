<script>
	import Repl from '$lib/index.svelte';
	import { onMount } from 'svelte';
	import '@sveltejs/site-kit/styles/index.css';
	import '@sveltejs/site-kit/styles/code.css';
	import { updateAttr, getBlockAttrs } from '$lib/api';
	import debounce from '$lib/utils/debounce';

	const DEFAULT_REPL_STATES = JSON.stringify([
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
	]);

	let repl;
	const ATTR_KEY = 'custom-svelte-repl';

	const getBlockEl = () => window.frameElement?.parentElement?.parentElement;

	const getReplState = async () => {
		const blockNodeEl = getBlockEl();
		if (!blockNodeEl) {
			return DEFAULT_REPL_STATES;
		}
		const { data } = await getBlockAttrs(blockNodeEl.dataset.nodeId);
		return data[ATTR_KEY] || DEFAULT_REPL_STATES;
	};

	onMount(async () => {
		const initialReplState = await getReplState();
		const initialComponents = JSON.parse(initialReplState);
		repl.set({
			components: initialComponents
		});

		// Along with block width
		frameElement.style.width = frameElement.parentElement.style.width =
			frameElement.parentElement.parentElement.offsetWidth + 'px';
	});

	const handleReplChange = debounce((changedComponents) => {
		const blockEl = getBlockEl();
		if (blockEl) {
			updateAttr(blockEl.dataset.nodeId, {
				[ATTR_KEY]: JSON.stringify(changedComponents.detail.components)
			});
		}
	});
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
