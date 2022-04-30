<script lang="ts">
  import type { Reminder } from '../model/Reminder.model.svelte';
  export let reminder: Reminder;
</script>

<div class="reminder-card">
  <span>Tipo recordatorio: {reminder.tipology}</span>
  <span>Alias: {reminder.alias}</span>
  <span>Proveedor: {reminder.provider}</span>
  <span>Localizador: {reminder.locatorId}</span>
  <span>Fecha: {reminder.date}</span>
  <span>Importe: {reminder.amount}</span>
</div>

<style style="scss">
  .reminder-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
