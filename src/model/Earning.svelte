<script lang="ts" context="module">
  export type Earning = {
    amount: number;
    alias: string;
    date: Date;
    email?: string;
    id?: string;
    locatorId: string;
    product: Product;
    provider: string;
    uid?: string;
  };

  export enum Product {
    FLIGHT = 'FLIGHT',
    HOTEL = 'HOTEL',
    INSURANCE = 'INSURANCE',
    PACK = 'PACK',
    RENTAL_CAR = 'RENTAL_CAR',
  }
</script>
