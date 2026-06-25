export function formatPrice(value) {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("es-MX").format(Number(value || 0));
}
