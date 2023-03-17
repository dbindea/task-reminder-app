<script lang="ts">
  import { _ } from 'svelte-i18n';
  import SvelteSeo from 'svelte-seo';
  import EarningForm from '../components/EarningForm.svelte';
  import EarningList from '../components/EarningList.svelte';
  import ReminderForm from '../components/ReminderForm.svelte';
  import ReminderList from '../components/ReminderList.svelte';
  import type { ActionType } from '../model/ActionType.svelte';
  import { AppType } from '../model/AppType.svelte';
  import { appType, resetOperation } from '../services/store.service';

  let objectToUpdate: any;
  let operation: { action: ActionType };

  function handleEvent(event) {
    objectToUpdate = event.detail;
    operation = { ...{ action: event.type } };
  }

  function clearObject() {
    objectToUpdate = undefined;
    operation = undefined;
  }

  resetOperation.subscribe((value) => {
    if (value) {
      clearObject();
      $resetOperation = false;
    }
  });
</script>

<div class="main">
  {#if $appType === AppType.Reminders}
    <ReminderForm collectionName={$appType} {objectToUpdate} {operation} on:clear={clearObject} />
    <ReminderList collectionName={$appType} on:remove={handleEvent} on:update={handleEvent} />
  {/if}
  {#if $appType === AppType.Earnings}
    <EarningForm collectionName={$appType} {objectToUpdate} {operation} on:clear={clearObject} />
    <EarningList collectionName={$appType} on:remove={handleEvent} on:update={handleEvent} />
  {/if}
</div>

<SvelteSeo title="{$_(`app.${$appType}.footer.app_name`)} &copy;" description={$_(`app.${$appType}.seo.description`)} />

<style type="scss">
  .main {
    text-shadow: var(--text-shadow);
  }
</style>
