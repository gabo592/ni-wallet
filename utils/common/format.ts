export async function formatCurrency(value: number, currency: string) {
  const formatter = new Intl.NumberFormat('default', {
    style: 'currency',
    currency,
  });

  return formatter.format(value);
}
