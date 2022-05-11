<script lang="ts">
  import { COLLECTION, db } from '../firebase';
  import type { Reminder } from '../model/Reminder.model.svelte';
  import { onMount } from 'svelte';
  import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
  import ReminderCard from './ReminderCard.svelte';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import { todayReminders, totalReminders, isLoggedIn, user } from '../services/store.service';
  import type { User } from '../model/user.model';
  import type { Unsubscribe } from 'firebase/auth';

  let reminders: Reminder[] = [];
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
    totalReminders.update(() => reminders.length);
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
  });
</script>

<div class="reminder-list">
  {#if !$isLoggedIn}
    <div class="panel">¡Necesitas entrar con una cuenta de Google para ver tus recordatorios!</div>
  {:else if !reminders.length}
    <div class="panel">¡Crea tu primer recordatorio!</div>
  {/if}
  {#each reminders as reminder}
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
    border: solid 2px #385270;
    border-radius: 8px;
    margin: 16px 0;
  }
</style>
