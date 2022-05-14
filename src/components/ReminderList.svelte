<script lang="ts">
  import ReminderCard from './ReminderCard.svelte';
  import { COLLECTION, db } from '../firebase';
  import { onMount } from 'svelte';
  import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import { todayReminders, totalReminders, isLoggedIn, user, filterValue } from '../services/store.service';
  import { _ } from 'svelte-i18n';
  import type { Reminder } from '../model/Reminder.model.svelte';
  import type { User } from '../model/user.model';
  import type { Unsubscribe } from 'firebase/auth';

  let reminders: Reminder[] = [];
  let filterReminders: Reminder[] = [];
  const today = format_YYYYMMDD(new Date(), '-');

  const watchFirestore = (uid: string): Unsubscribe => {
    const q = query(collection(db, COLLECTION), where('uid', '==', uid), where('date', '>=', today), orderBy('date', 'asc'));
    return onSnapshot(q, (querySnapshot) => {
      reminders = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Reminder[];
    });
  };

  $: {
    reminders, updateStore();
  }

  function updateStore() {
    filterReminders = filterByValue($filterValue);
    totalReminders.update(() => filterReminders.length);
    todayReminders.update(() => reminders.filter((r: Reminder) => format_YYYYMMDD(r.date, '-') === today).length);
  }

  onMount(() => {
    isLoggedIn.subscribe((isLogged) => {
      if (isLogged && ($user as User).uid) {
        watchFirestore(($user as User).uid);
      } else {
        reminders = [];
      }
    });

    filterValue.subscribe((filterValue) => {
      filterReminders = filterByValue(filterValue);
      totalReminders.update(() => filterReminders.length);
    });
  });

  const filterByValue = (value: string) => {
    if (value) {
      return reminders.filter((reminder: Reminder) => {
        const reminderString = Object.keys(reminder)
          .map((key) => reminder[key])
          .join(' ');
        return reminderString?.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      return reminders;
    }
  };
</script>

<div class="reminder-list">
  {#if !$isLoggedIn}
    <div class="panel">{$_('app.main.list.no_auth')}</div>
  {:else if !reminders.length}
    <div class="panel">{$_('app.main.list.no_reminder')}</div>
  {/if}
  {#each filterReminders as reminder}
    <ReminderCard {reminder} on:remove on:update />
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
