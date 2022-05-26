<script lang="ts">
  import EarningForm from '../components/EarningForm.svelte';
  import EarningList from '../components/EarningList.svelte';
  import ReminderForm from '../components/ReminderForm.svelte';
  import ReminderList from '../components/ReminderList.svelte';
  import type { ActionType } from '../model/ActionType.svelte';
  import { AppType } from '../model/AppType.svelte';
  import { appType } from '../services/store.service';
  import SvelteSeo from 'svelte-seo';
  import { _ } from 'svelte-i18n';

  let idToRemove: string;
  let objectToUpdate: any;
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
  {#if $appType === AppType.Reminders}
    <ReminderForm collectionName={$appType} {idToRemove} {objectToUpdate} {operation} />
    <ReminderList collectionName={$appType} on:remove={handleRemove} on:update={handleUpdate} />
  {/if}
  {#if $appType === AppType.Earnings}
    <EarningForm collectionName={$appType} {idToRemove} {objectToUpdate} {operation} />
    <EarningList collectionName={$appType} on:remove={handleRemove} on:update={handleUpdate} />
  {/if}
</div>

<SvelteSeo title="{$_(`app.${$appType}.footer.app_name`)} &copy;" description="{$_(`app.${$appType}.seo.description`)}" />

<style type="scss">
  .main {
    text-shadow: var(--text-shadow);
  }
</style>
