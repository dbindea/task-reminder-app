<script lang="ts">
  import ReminderForm from '../components/ReminderForm.svelte';
  import ReminderList from '../components/ReminderList.svelte';
  import type { ActionType } from '../model/ActionType.model.svelte';
  import type { Reminder } from '../model/Reminder.model.svelte';

  let idToRemove: string;
  let reminderToUpdate: Reminder;
  let reminderOp: { action: ActionType };

  function handleRemove(event) {
    idToRemove = event.detail;
    reminderOp = { ...{ action: event.type } };
  }

  function handleUpdate(event) {
    reminderToUpdate = event.detail;
    reminderOp = { ...{ action: event.type } };
  }
</script>

<div class="main">
  <ReminderForm {idToRemove} {reminderToUpdate} {reminderOp} />
  <ReminderList on:remove={handleRemove} on:update={handleUpdate} />
</div>

<style type="scss">
  .main {
    color: var(--color-text);
    text-shadow: var(--text-shadow);
  }
</style>
