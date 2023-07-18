<script>
  import { onDestroy, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { setupI18n } from '../services/i18n.service';
  import { appType, langStore } from '../services/store.service';

  const scrollFooter = 120;
  let show = false;

  const changeLang = (lang) => {
    setupI18n({ withLocale: lang });
    localStorage.setItem('lang', lang);
    $langStore = lang;
  };

  const scrollTop = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  };

  onMount(() => {
    window.onscroll = () => {
      show = window.scrollY > scrollFooter;
    };
  });

  onDestroy(() => {
    window.onscroll = () => {};
  });
</script>

<div class="footer">
  <p>{$_(`app.${$appType}.footer.app_name`)} &copy;</p>
  <div class="lang">
    <img class="flag" src="assets/img/ro.svg" alt="ro" on:click={() => changeLang('ro')} />
    <img class="flag" src="assets/img/es.svg" alt="es" on:click={() => changeLang('es')} />
    <img class="flag" src="assets/img/uk.svg" alt="en" on:click={() => changeLang('en')} />
  </div>
  <div class={show ? 'up' : 'disabled'} on:click={scrollTop}>
    <span class="icon-arrow icon" />
  </div>
</div>

<style>
  .footer {
    display: flex;
    align-items: center;
    padding: 8px 32px 8px 16px;
    justify-content: space-between;
    margin: 0 8px;
    border-radius: 8px;
    background-color: var(--color-dark);
    box-shadow: var(--bg-shadow);
  }

  .lang {
    display: flex;
    gap: 16px;
    height: 18px;
  }
  .flag {
    cursor: pointer;
    object-fit: fill;
    border-radius: 2px;
  }

  .up {
    transform: rotate(90deg);
    position: fixed;
    bottom: 42px;
    right: 16px;
    height: 36px;
    width: 36px;
    display: grid;
    align-items: center;
    justify-items: center;
    background: var(--color-dark);
    border-radius: 8px;
    font-size: 32px;
    box-shadow: 0 0 2px 1px #244974;
    cursor: pointer;
  }

  .icon {
    animation: MoveUpDown 1.4s linear infinite;
  }

  @keyframes MoveUpDown {
    0%,
    100% {
      transform: translateX(2px);
    }
    50% {
      transform: translateX(-2px);
    }
  }
</style>
