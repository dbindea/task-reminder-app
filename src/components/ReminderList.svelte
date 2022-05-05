<script lang="ts">
  import { db } from '../firebase';
  import type { Reminder } from '../model/Reminder.model.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { onSnapshot, collection } from 'firebase/firestore';
  import ReminderCard from './ReminderCard.svelte';

  let reminders: Reminder[] = [];

  const unsubscribe = onSnapshot(
    collection(db, 'Reminders'),
    (querySnapshot) => {
      // console.log('log', querySnapshot);

      reminders = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Reminder[];

      console.log(reminders);
    },
    (err) => {
      console.log(err);
    },
  );

  onMount(() => {
    unsubscribe;
  });
  // onDestroy(unsubscribe);
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
