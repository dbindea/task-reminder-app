import { writable } from 'svelte/store';

export const todayReminders = writable(0);
export const totalReminders = writable(0);
export const user = writable({});
export const isLoggedIn = writable(false);
export const isVisibleMenu = writable(false);
export const filterValue = writable(null);
