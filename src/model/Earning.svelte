<script lang="ts" context="module">
  export type Earning = {
    amount: number;
    alias: string;
    date: string;
    email?: string;
    id?: string;
    isDeleted?: boolean;
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
    TRAIN = 'TRAIN',
    DEFAULT = 'DEFAULT'
  }
</script>
