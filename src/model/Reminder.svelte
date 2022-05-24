<script lang="ts" context="module">
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

  export enum Tipology {
    CHECKIN = 'CHECKIN',
    PAYMENT = 'PAYMENT',
    SEARCH = 'SEARCH',
    DEFAULT = 'DEFAULT',
  }

  export const hiddenOptionsByTipology: { [key in Tipology] } = {
    CHECKIN: {
      amount: true,
    },
    PAYMENT: {},
    SEARCH: {
      amount: true,
      locatorId: true,
      provider: true,
    },
    DEFAULT: {
      amount: true,
      locatorId: true,
      provider: true,
    },
  };
</script>
