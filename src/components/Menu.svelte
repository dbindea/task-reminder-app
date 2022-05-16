<script lang="ts">
  import { isVisibleMenu } from '../services/store.service';
</script>

<div class={$isVisibleMenu ? 'menu' : 'menu menu--toggle'}>
  {#if $isVisibleMenu}
    <p>menu</p>
  {/if}
</div>

<style type="scss">
  .menu {
    background: red;
    position: fixed;
    height: 48vh;
    width: 32vh;
    padding: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    visibility: visible;
    transition: width 0.4s, visibility 0.4s;

    &--toggle {
      width: 0;
      padding: 0;
      visibility: hidden;
    }
  }
</style>
