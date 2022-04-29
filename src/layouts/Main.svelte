<script lang="ts">
  import NewReminder from '../components/NewReminder.svelte';
  import ReminderList from '../components/ReminderList.svelte';
  import { Reminder, Tipology } from '../model/Reminder.model.svelte';

  let reminder: Reminder = {
    tipology: Tipology.CHECKIN,
    alias: 'Marian Dubai',
    date: new Date(),
    locatorId: 'XYZABC',
    provider: 'Ryanair',
  };
</script>

<div class="main">
  <NewReminder />
  <ReminderList />
</div>

<style type="scss">
  .main {
    background-color: #ffffff;
  }
</style>
