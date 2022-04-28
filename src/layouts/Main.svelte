<script lang="ts">
  import { Reminder, Tipology } from '../model/Reminder.model.svelte';

  let reminder: Reminder = {
    tipology: Tipology.CHECKIN,
    alias: 'Marian Dubai',
    date: new Date(),
    locatorId: 'XYZABC',
    provider: 'Ryanair',
  };
</script>

<div>
  <span> Reminder </span>
  <pre>
    {JSON.stringify(reminder)}
</pre>
</div>

<style type="scss">
</style>
