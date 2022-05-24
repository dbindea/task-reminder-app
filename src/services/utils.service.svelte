<script lang="ts" context="module">
  import Toastify from 'toastify-js';

  export enum ToastSeverity {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
  }

  export const format_YYYYMMDD = (date: Date, separator: string): string => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join(separator);
  };

  export const format_DDMMYYYY = (date: Date, separator: string): string => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join(separator);
  };

  export const toast = (severity: ToastSeverity, text: string) => {
    const colorMap: { [key in ToastSeverity]: string } = {
      [ToastSeverity.ERROR]: 'linear-gradient(180deg, red, var(--color-dark))',
      [ToastSeverity.SUCCESS]: 'linear-gradient(180deg, var(--color-fucs), var(--color-dark))',
      [ToastSeverity.INFO]: 'linear-gradient(180deg, var(--color-turq), var(--color-dark))',
    };
    Toastify({
      text,
      style: {
        background: colorMap[severity],
      },
    }).showToast();
  };

  export const trim = (x) => (x == null ? null : x.trim());

  export const formatNumber = (number: number, locale: string): string => {
    return (Number(number) || 0).toLocaleString(locale, { minimumFractionDigits: 2 }) + ' €';
  };
</script>
