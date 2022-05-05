<script lang="ts">
  import ReminderForm from '../components/ReminderForm.svelte';
  import ReminderList from '../components/ReminderList.svelte';
  import type { Reminder } from '../model/Reminder.model.svelte';

  let idToRemove: string;
  let reminderToUpdate: Reminder;
  let action: string;

  function handleRemove(event) {
    idToRemove = event.detail;
    action = event.type;
  }

  function handleUpdate(event) {
    reminderToUpdate = event.detail;
    action = event.type;
  }
</script>

<div class="main">
  <ReminderForm {idToRemove} {reminderToUpdate} {action} />
  <ReminderList on:remove={handleRemove} on:update={handleUpdate} />
</div>

<style type="scss">
  .main {
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 4px rgb(0 0 0 / 40%);
  }
</style>
