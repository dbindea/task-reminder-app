<script lang="ts">
  import Reminder from '../model/Reminder.model.svelte';

  let reminders: Reminder[] = [];

  console.log(reminders);
  
</script>

<div class="reminder-list">list...</div>

<style type="scss">
  .reminder-list {
    padding: 8px;
    border-color: #ffffff;
  }
</style>
