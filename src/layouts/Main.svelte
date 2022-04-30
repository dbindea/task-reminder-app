<script lang="ts">
  import ReminderForm from '../components/ReminderForm.svelte';
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
  <ReminderForm />
  <ReminderList />
</div>

<style type="scss">
  .main {
    background-color: #303030;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 4px rgb(0 0 0 / 40%);
  }
</style>
