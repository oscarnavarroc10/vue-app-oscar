/**
 * Format a number as a price in MXN format.
 * @param {number} value
 * @returns {string}
 */
export const formatPrice = (value) => {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format a number with locale-aware thousands separators.
 * @param {number} value
 * @returns {string}
 */
export const formatNumber = (value) => {
  return new Intl.NumberFormat("es-MX").format(Number(value || 0));
};
