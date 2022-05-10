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

  const formatNumber = (number: number) => {
    if (number) return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
</script>

<div class="card">
  <div class="reminder-card">
    <div class="first-item">
      <div class="field">
        <span class="field-title">{$_('app.main.card.tipology')}</span><span class="field-text">{$_(`app.main.form.${reminder.tipology}`)}</span>
      </div>
      <!-- DROPDOWN -->
      <span class="icon-actions rotate dropdown">
        <div class="dropdown-content">
          <div class="dropdown-actions">
            <ul>
              <li class="action-item" on:click={() => update(reminder)}><span class="icon-edit" />Actualizar</li>
              <li class="action-item" on:click={() => remove(reminder.id)}><span class="icon-delete" />Eliminar</li>
            </ul>
          </div>
        </div>
      </span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.alias')}</span><span class="capitalize field-text">{reminder.alias}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.provider')}</span><span class="field-text capitalize">{reminder.provider}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.locatorId')}</span><span class="field-text uppercase">{reminder.locatorId}</span>
    </div>
    <div class="field">
      <span class="field-title">{$_('app.main.form.date')}</span><span class="field-text">{formatDate(reminder.date, '/')}</span>
    </div>
    <div class={!reminder.amount ? 'disabled' : 'field'}>
      <span class="field-title">{$_('app.main.form.amount')}</span><span class="field-text">{formatNumber(reminder.amount)} €</span>
    </div>
  </div>
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
    box-shadow: var(--bg-shadow);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 16px;
    background: linear-gradient(180deg, var(--color-turq), var(--color-fucs));
    border-radius: 8px;
  }

  .dropdown-actions {
    padding: 12px 12px 12px 0;
    border-radius: 8px;
    background-color: var(--color-dark);
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
        display: flex;
        gap: 8px;
      }
    }
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }

  .card {
    padding: 2px;
    border-radius: 8px;
    margin-bottom: 16px;
    box-shadow: 0px 2px 12px 4px rgb(0 0 0 / 40%);
    &:hover {
      background: linear-gradient(180deg, var(--color-turq), var(--color-fucs));
      box-shadow: none;
    }
  }
  .reminder-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px 16px;
    border-radius: 8px;
    background-color: var(--color-light);
    &:hover {
      background: var(--color-dark);
    }
  }

  .first-item {
    display: flex;
    justify-content: space-between;
  }

  .field {
    display: flex;
    align-items: center;
  }
  .field-title {
    font-weight: 600;
    font-size: 16px;
    min-width: 120px;
  }

  .field-text {
    font-weight: 300;
  }

  .rotate {
    transform: rotate(90deg);
    font-size: 28px;
  }
</style>
