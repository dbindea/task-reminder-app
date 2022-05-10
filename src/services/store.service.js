import { writable } from 'svelte/store';
export const todayReminders = writable(0);
export const totalReminders = writable(0);
export const user = writable({});
export const isLoggedIn = writable(false);