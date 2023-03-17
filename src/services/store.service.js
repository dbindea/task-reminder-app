import { writable } from 'svelte/store';
import { AppType } from '../model/AppType.svelte';

export const todayReminders = writable(0);
export const totalReminders = writable(0);
export const todayEarnings = writable(0);
export const totalEarnings = writable(0);

export const user = writable({});
export const isLoggedIn = writable(false);
export const isVisibleMenu = writable(false);
export const filterValue = writable(null);
export const langStore = writable(localStorage.getItem('lang') || 'es');
export const appType = writable(localStorage.getItem('AppType') || AppType.Reminders);
export const resetOperation = writable(false);
