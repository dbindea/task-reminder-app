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

  let objectToUpdate: any;
  let operation: { action: ActionType };

  function handleEvent(event) {
    objectToUpdate = event.detail;
    operation = { ...{ action: event.type } };
  }
</script>

<div class="main">
  {#if $appType === AppType.Reminders}
    <ReminderForm collectionName={$appType} {objectToUpdate} {operation} />
    <ReminderList collectionName={$appType} on:remove={handleEvent} on:update={handleEvent} />
  {/if}
  {#if $appType === AppType.Earnings}
    <EarningForm collectionName={$appType} {objectToUpdate} {operation} />
    <EarningList collectionName={$appType} on:remove={handleEvent} on:update={handleEvent} />
  {/if}
</div>

<SvelteSeo title="{$_(`app.${$appType}.footer.app_name`)} &copy;" description="{$_(`app.${$appType}.seo.description`)}" />

<style type="scss">
  .main {
    text-shadow: var(--text-shadow);
  }
</style>
