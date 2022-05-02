<script lang="ts">
  import ReminderForm from '../components/ReminderForm.svelte';
  import ReminderList from '../components/ReminderList.svelte';
</script>

<div class="main">
  <ReminderForm />
  <ReminderList />
</div>

<style type="scss">
  .main {
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 4px rgb(0 0 0 / 40%);
  }
</style>
