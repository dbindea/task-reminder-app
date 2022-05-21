import { writable } from 'svelte/store';
import { APP_TYPE } from '../model/AppType.model.svelte';

export const todayReminders = writable(0);
export const totalReminders = writable(0);
export const user = writable({});
export const isLoggedIn = writable(false);
export const isVisibleMenu = writable(false);
export const filterValue = writable(null);
export const appType = writable(localStorage.getItem('appType') || APP_TYPE.REMINDERS);
