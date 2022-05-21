<script lang="ts" context="module">
  import { APP_TYPE } from './AppType.model.svelte';

  export type Earning = {
    amount: number;
    alias: string;
    date: Date;
    email?: string;
    id?: string;
    locatorId: string;
    provider: string;
    product: Product;
    uid?: string;
  };

  export type Reminder = {
    amount?: number;
    alias: string;
    date: Date;
    email?: string;
    id?: string;
    locatorId: string;
    provider: string;
    tipology: Tipology;
    uid?: string;
  };

  export type AppObject = {
    [APP_TYPE.REMINDERS]: Reminder;
    [APP_TYPE.EARNINGS]: Earning;
  };

  export enum Tipology {
    CHECKIN = 'CHECKIN',
    SEARCH = 'SEARCH',
    PAYMENT = 'PAYMENT',
    DEFAULT = 'DEFAULT',
  }

  export enum Product {
    FLIGHT = 'FLIGHT',
    HOTEL = 'HOTEL',
    INSURANCE = 'INSURANCE',
    RENTAL_CAR = 'RENTAL_CAR',
    PACK = 'PACK',
  }

  export const hiddenOptionsByTipology: { [key in Tipology] } = {
    CHECKIN: {
      amount: true,
    },
    PAYMENT: {},
    SEARCH: {
      locatorId: true,
      amount: true,
    },
    DEFAULT: {
      provider: true,
      locatorId: true,
      amount: true,
    },
  };
</script>
