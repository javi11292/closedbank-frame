import { writable } from "svelte/store";

export const state = writable({ generation: 0, population: 0, record: 0 });
