<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { COLLECTION, db } from '../firebase';
  import { onMount } from 'svelte';
  import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import { todayReminders, totalReminders, isLoggedIn, user, filterValue, appType } from '../services/store.service';
  import type { User } from '../model/user.model';
  import type { Unsubscribe } from 'firebase/auth';
  import type { AppObject } from '../model/AppObject.model.svelte';
import ObjectCard from './ObjectCard.svelte';

  let reminders: AppObject[] = [];
  let filterReminders: AppObject[] = [];
  const today = format_YYYYMMDD(new Date(), '-');

  const watchFirestore = (uid: string): Unsubscribe => {
    const q = query(collection(db, COLLECTION), where('uid', '==', uid), where('date', '>=', today), orderBy('date', 'asc'));
    return onSnapshot(q, (querySnapshot) => {
      reminders = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as AppObject[];
    });
  };

  $: {
    reminders, updateStore();
  }

  function updateStore() {
    filterReminders = filterByValue($filterValue);
    totalReminders.update(() => filterReminders.length);
    todayReminders.update(() => reminders.filter((r: AppObject) => format_YYYYMMDD(r.date, '-') === today).length);
  }

  onMount(() => {
    appType.subscribe((e) => {
      // TODO
    });

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
      return reminders.filter((reminder: AppObject) => {
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
    <ObjectCard appObject={reminder} on:remove on:update />
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
