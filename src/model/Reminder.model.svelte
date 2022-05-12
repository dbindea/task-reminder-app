<script lang="ts" context="module">
  export type Reminder = {
    id?: string;
    tipology: Tipology;
    alias: string;
    provider: string;
    locatorId: string;
    date: Date;
    amount?: number;
    uid?: string;
    email?: string;
  };

  export enum Tipology {
    CHECKIN = 'CHECKIN',
    SEARCH = 'SEARCH',
    PAYMENT = 'PAYMENT',
    DEFAULT = 'DEFAULT',
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
