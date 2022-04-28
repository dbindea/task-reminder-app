<script lang="ts" context="module">
  export interface Reminder {
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
