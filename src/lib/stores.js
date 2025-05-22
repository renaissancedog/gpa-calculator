import { writable } from 'svelte/store';
export let grades = writable(new Array(56).fill(0));
export let credits = writable(new Array(56).fill(0));
