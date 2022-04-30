<script lang="ts" context="module">
  export type Reminder = {
    id?: string;
    tipology: Tipology;
    alias: string;
    provider: string;
    locatorId: string;
    date: Date;
    amount?: number;
  }

  export enum Tipology {
    CHECKIN = 'CHECKIN',
    PAYMENT = 'PAYMENT',
  }
</script>
