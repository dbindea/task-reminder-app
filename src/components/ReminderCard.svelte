<script lang="ts">
  import type { Reminder } from '../model/Reminder.model.svelte';
  import { _ } from 'svelte-i18n';

  export let reminder: Reminder;
</script>

<div class="reminder-card">
  <span>{$_('app.main.card.tipology')}: {$_(`app.main.form.${reminder.tipology}`)}</span>
  <span>{$_('app.main.form.alias')}: {reminder.alias}</span>
  <span>{$_('app.main.form.provider')}: {reminder.provider}</span>
  <span>{$_('app.main.form.locatorId')}: {reminder.locatorId}</span>
  <span>{$_('app.main.card.date')}: {reminder.date}</span>
  <span>{$_('app.main.form.amount')}: {reminder.amount}</span>

  <div>
    ***
  </div>
</div>

<style type="scss">
  .reminder-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    margin-bottom: 16px;
    border: solid 2px rgba(255, 255, 255, 0.18);
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 250px 200px rgb(18 61 112 / 60%)
    }
  }
</style>
