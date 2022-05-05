<script lang="ts">
  import type { Reminder } from '../model/Reminder.model.svelte';
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';

  export let reminder: Reminder;
  const dispatch = createEventDispatcher();

  const update = (reminder: Reminder) => {
    dispatch('update', reminder);
  };

  const remove = (id: string) => {
    dispatch('remove', id);
  };
</script>

<div class="reminder-card">
  <div class="actions">
    <span>{$_('app.main.card.tipology')}: {$_(`app.main.form.${reminder.tipology}`)}</span>
    <span class="icon-actions rotate dropdown">
      <div class="dropdown-content a">
        <div class="b">
          <ul>
            <li on:click={() => update(reminder)}>Actualizar</li>
            <li on:click={() => remove(reminder.id)}>Eliminar</li>
          </ul>
        </div>
      </div>
    </span>
  </div>
  <span>{$_('app.main.form.alias')}: {reminder.alias}</span>
  <span>{$_('app.main.form.provider')}: {reminder.provider}</span>
  <span>{$_('app.main.form.locatorId')}: {reminder.locatorId}</span>
  <span>{$_('app.main.card.date')}: {reminder.date}</span>
  <span>{$_('app.main.form.amount')}: {reminder.amount}</span>
</div>

<style type="scss">
  .dropdown {
    rotate: initial;
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    transform: translateY(12px) rotate(-90deg);
    display: none;
    position: absolute;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 16px;

    &.a {
      background: linear-gradient(180deg, #3ddcff, #d150ff);
      border-radius: 8px;
    }
  }

  .b {
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

  .actions {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .rotate {
    transform: rotate(90deg);
    font-size: 28px;
  }
</style>
