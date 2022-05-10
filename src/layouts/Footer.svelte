<script>
  import { _ } from 'svelte-i18n';
  import { setupI18n } from '../services/i18n.service';

  const changeLang = (lang) => {
    setupI18n({ withLocale: lang });
    localStorage.setItem('lang', lang);
  };
</script>

<div class="footer">
  <p>Task Reminder App</p>
  <div class="lang">
    <img class="flag" src="assets/img/ro.svg" alt="ro" on:click={() => changeLang('ro')} />
    <img class="flag" src="assets/img/es.svg" alt="es" on:click={() => changeLang('es')} />
    <img class="flag" src="assets/img/uk.svg" alt="en" on:click={() => changeLang('en')} />
  </div>
</div>

<style>
  .footer {
    display: flex;
    align-items: center;
    padding: 8px 32px 8px 16px;
    color: var(--color-text);
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
    border-radius: 4px;
  }
</style>
