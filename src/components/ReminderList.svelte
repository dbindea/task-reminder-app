<script lang="ts">
  import { db } from '../firebase';
  import type { Reminder } from '../model/Reminder.model.svelte';
  import { onDestroy } from 'svelte';
  import { onSnapshot, collection } from 'firebase/firestore';
  import ReminderCard from './ReminderCard.svelte';
  import { format_YYYYMMDD } from '../services/utils.service.svelte';
  import { todayReminders, totalReminders } from '../services/store.service';

  let reminders: Reminder[] = [];
  const today = format_YYYYMMDD(new Date(), '-');

  const usubReminders = onSnapshot(
    collection(db, 'Reminders'),
    (querySnapshot) => {
      reminders = (
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Reminder[]
      )
        .filter((r: Reminder) => format_YYYYMMDD(r.date, '-') >= today)
        .sort((a, b) => (a.date > b.date ? 1 : -1));
    },
    (error) => {
      console.error(error);
    },
  );

  $: {
    reminders, updateStore();
  }

  function updateStore() {
    totalReminders.update(() => reminders.length);
    todayReminders.update(() => reminders.filter((r: Reminder) => format_YYYYMMDD(r.date, '-') === today).length);
  }

  onDestroy(usubReminders);
</script>

<div class="reminder-list">
  {#each reminders as reminder}
    <ReminderCard {reminder} on:remove on:update />
  {/each}
</div>

<style type="scss">
  .reminder-list {
    padding: 8px;
  }
</style>
