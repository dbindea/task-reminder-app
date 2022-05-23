<script lang="ts">
  import ReminderForm from '../components/ObjectForm.svelte';
  import ReminderList from '../components/ItemList.svelte';
  import type { ActionType } from '../model/ActionType.model.svelte';
  import type { AppObject } from '../model/AppObject.model.svelte';

  let idToRemove: string;
  let objectToUpdate: AppObject;
  let operation: { action: ActionType };

  function handleRemove(event) {
    idToRemove = event.detail;
    operation = { ...{ action: event.type } };
  }

  function handleUpdate(event) {
    objectToUpdate = event.detail;
    operation = { ...{ action: event.type } };
  }
</script>

<div class="main">
  <ReminderForm {idToRemove} {objectToUpdate} {operation} />
  <ReminderList on:remove={handleRemove} on:update={handleUpdate} />
</div>

<style type="scss">
  .main {
    text-shadow: var(--text-shadow);
  }
</style>
