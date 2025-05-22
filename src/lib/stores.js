import { writable } from 'svelte/store';
export let grades = writable(new Array(56).fill(null));
export let weights = writable(new Array(56).fill("Regular"));
export const WG=[100,98,98,100,96,100,100,100,98,98,100,96,100,100,100,97,100,100,100,100,100,100,96,100,100,100,99,99]
export const WW=["Honors","AP","Honors","Honors","Honors","Regular","Regular","Honors","AP","Honors","Honors","Honors","Regular","Regular","Regular","Honors","Honors","AP","AP","Regular","Honors","Regular","Honors","Honors","AP","AP","Regular","Honors"]