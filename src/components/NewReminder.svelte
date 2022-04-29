<div class="new-reminder">
  <form class="form">
    <select class="form-item" name="tipology" id="tipology">
      <option value="CHECKIN">Checkin</option>
      <option value="PAYMENT">Payment</option>
    </select>
    <input class="form-item capitalize" type="text" name="alias" id="alias" placeholder="Alias" spellcheck="false" autocomplete="off" />
    <input class="form-item capitalize" type="text" name="provider" id="provider" placeholder="Proveedor" spellcheck="false" autocomplete="off" />
    <input class="form-item uppercase" type="text" name="locatorId" id="locatorId" placeholder="Localizador" spellcheck="false" autocomplete="off" />
    <input class="form-item" type="date" name="date" id="date" placeholder="Fecha recordatorio" />
    <input class="form-item" type="number" name="amount" id="amount" placeholder="Importe" autocomplete="off" />
  </form>
</div>

<style type="scss">
  .new-reminder {
    background-color: #425968;
  }
  .form {
    padding: 8px;

    input:focus:hover,
    select:focus:hover,
    textarea:focus:hover {
      border-color: #2d96cd;
    }

    input::placeholder,
    select::placeholder,
    textarea::placeholder {
      color: #d6e0eb;
    }

    select>option {
      color: #425968;
      background-color: #ffffff;
    }
  }

  .form-item {
    width: 100%;
  }

  .capitalize {
    text-transform: capitalize;
  }

  input[type='text']::placeholder {
    text-transform: none;
  }

  .uppercase {
    text-transform: uppercase;
  }

  input[type='date'] {
    i {
      color: #ffffff
    }
  }
</style>
