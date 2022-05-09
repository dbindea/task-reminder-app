<script lang="ts">
  import type { Reminder } from '../model/Reminder.model.svelte';
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { ActionType } from '../model/ActionType.model.svelte';
  import { format_DDMMYYYY } from '../services/utils.service.svelte';

  export let reminder: Reminder;
  const formatDate = format_DDMMYYYY;

  const dispatch = createEventDispatcher();

  const update = (reminder: Reminder) => {
    dispatch(ActionType.UPDATE, reminder);
  };

  const remove = (id: string) => {
    dispatch(ActionType.REMOVE, id);
  };
</script>

<div class="reminder-card">
  <div class="first-item">
    <span>{$_('app.main.card.tipology')}: {$_(`app.main.form.${reminder.tipology}`)}</span>
    <!-- DROPDOWN -->
    <span class="icon-actions rotate dropdown">
      <div class="dropdown-content">
        <div class="dropdown-actions">
          <ul>
            <li on:click={() => update(reminder)}>Actualizar</li>
            <li on:click={() => remove(reminder.id)}>Eliminar</li>
          </ul>
        </div>
      </div>
    </span>
  </div>
  <span class="capitalize">{$_('app.main.form.alias')}: {reminder.alias}</span>
  <span class="capitalize">{$_('app.main.form.provider')}: {reminder.provider}</span>
  <span>{$_('app.main.form.locatorId')}: <span class="uppercase">{reminder.locatorId}</span></span>
  <span>{$_('app.main.card.date')}: {formatDate(reminder.date, '/')}</span>
  <span class:disabled={!reminder.amount}>{$_('app.main.form.amount')}: {reminder.amount} €</span>
</div>

<style type="scss">
  .dropdown {
    rotate: initial;
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  .dropdown-content {
    transform: translateY(12px) rotate(-90deg);
    display: none;
    position: absolute;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 16px;
    background: linear-gradient(180deg, #3ddcff, #d150ff);
    border-radius: 8px;
  }

  .dropdown-actions {
    padding: 12px;
    border-radius: 8px;
    background-color: #0b1b2e;
    margin: 2px;

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-left: 24px;
      padding-right: 24px;

      li {
        cursor: pointer;
      }
    }
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }

  .reminder-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    margin-bottom: 16px;
    border: solid 2px rgba(255, 255, 255, 0.18);
    border-radius: 8px;
    &:hover {
      box-shadow: 0 4px 250px 200px rgb(18 61 112 / 60%);
    }
  }

  .first-item {
    display: flex;
    justify-content: space-between;
  }
  .rotate {
    transform: rotate(90deg);
    font-size: 28px;
  }
</style>
