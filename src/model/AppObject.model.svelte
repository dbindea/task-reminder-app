<script lang="ts" context="module">

  export type AppObject = {
    amount?: number;
    alias: string;
    date: Date;
    email?: string;
    id?: string;
    locatorId: string;
    product?: Product;
    provider: string;
    tipology?: Tipology;
    uid?: string;
  };

  export enum Tipology {
    CHECKIN = 'CHECKIN',
    DEFAULT = 'DEFAULT',
    PAYMENT = 'PAYMENT',
    SEARCH = 'SEARCH',
  }

  export enum Product {
    FLIGHT = 'FLIGHT',
    HOTEL = 'HOTEL',
    INSURANCE = 'INSURANCE',
    PACK = 'PACK',
    RENTAL_CAR = 'RENTAL_CAR',
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

  export const hiddenOptionsByProduct: { [key in Product] } = {
    FLIGHT: {},
    HOTEL: {},
    INSURANCE: {},
    RENTAL_CAR: {},
    PACK: {}
  };
</script>
