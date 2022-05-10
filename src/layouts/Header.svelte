<script lang="ts">
  import { todayReminders } from '../services/store.service';
</script>

<div class="header">
  <span class="colours">Today Reminders</span><span class="colours colours--fine">{$todayReminders}</span>
</div>

<style type="scss">
  .header {
    padding: 16px;
    display: flex;
    gap: 12px;
  }

  .colours {
    background: linear-gradient(135deg, var(--color-turq), var(--color-fucs));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 18px;
    font-weight: 600;
    &--fine {
      font-weight: 300;
    }
  }
</style>
