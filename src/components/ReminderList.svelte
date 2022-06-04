<script lang="ts">
  import ReminderCard from './ReminderCard.svelte';
  import { db } from '../firebase';
  import { onMount } from 'svelte';
  import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import { todayReminders, totalReminders, isLoggedIn, user, filterValue } from '../services/store.service';
  import { _ } from 'svelte-i18n';
  import type { Reminder } from '../model/Reminder.svelte';
  import type { User } from '../model/user.model';
  import type { Unsubscribe } from 'firebase/auth';
  import type { AppType } from '../model/AppType.svelte';

  export let collectionName: AppType;

  let items: Reminder[] = [];
  let filterReminders: Reminder[] = [];
  const today = format_YYYYMMDD(new Date(), '-');

  const watchFirestore = (uid: string): Unsubscribe => {
    const q = query(collection(db, collectionName), where('uid', '==', uid), orderBy('date', 'asc'));
    return onSnapshot(q, (querySnapshot) => {
      items = (
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Reminder[]
      ).filter((elem) => !elem?.isDeleted);
    });
  };

  $: {
    items, updateStore();
  }

  function updateStore() {
    filterReminders = filterByValue($filterValue);
    totalReminders.update(() => filterReminders.length);
    todayReminders.update(() => items.filter((r: Reminder) => format_YYYYMMDD(r.date, '-') === today).length);
  }

  onMount(() => {
    isLoggedIn.subscribe((isLogged) => {
      if (isLogged && ($user as User).uid) {
        watchFirestore(($user as User).uid);
      } else {
        items = [];
      }
    });

    filterValue.subscribe((filterValue) => {
      filterReminders = filterByValue(filterValue);
      totalReminders.update(() => filterReminders.length);
    });
  });

  const filterByValue = (value: string) => {
    if (value) {
      return items.filter((reminder: Reminder) => {
        const reminderString = Object.keys(reminder)
          .map((key) => reminder[key])
          .join(' ');
        return reminderString?.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      return items;
    }
  };
</script>

<div class="reminder-list">
  {#if !$isLoggedIn}
    <div class="panel">{$_(`app.${collectionName}.main.list.no_auth`)}</div>
  {:else if !items.length}
    <div class="panel">{$_(`app.${collectionName}.main.list.no_items`)}</div>
  {/if}
  {#each filterReminders as reminder}
    <ReminderCard {collectionName} {reminder} on:remove on:update />
  {/each}
</div>

<style type="scss">
  .reminder-list {
    padding: 8px;
  }

  .panel {
    padding: 64px;
    text-align: center;
    line-height: 32px;
    letter-spacing: 0.5px;
    border: solid 2px var(--color-border);
    border-radius: 8px;
    margin: 16px 0;
  }
</style>
