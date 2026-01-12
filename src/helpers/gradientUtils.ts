/**
 * Utility functions for gradient class mappings
 */

/**
 * Maps color theme names to Tailwind button gradient classes
 * @param theme - The color theme (blue, emerald, purple, green, orange, etc.)
 * @returns Tailwind gradient className string
 */
export function getButtonGradientClass(theme: string): string {
  const gradientMap: Record<string, string> = {
    blue: 'bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    emerald: 'bg-linear-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800',
    purple: 'bg-linear-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800',
    green: 'bg-linear-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800',
    orange: 'bg-linear-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800',
    indigo: 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800',
  };

  return gradientMap[theme] || gradientMap.blue;
}

/**
 * Maps color theme names to Tailwind icon gradient classes for StyledIcon
 * @param theme - The color theme
 * @returns Tailwind gradient variant name
 */
export function getIconGradientVariant(theme: string): string {
  const variantMap: Record<string, string> = {
    blue: 'blue-gradient',
    emerald: 'emerald-gradient',
    green: 'green-gradient',
    purple: 'purple-gradient',
    orange: 'blue-gradient',
  };

  return variantMap[theme] || 'blue-gradient';
}
