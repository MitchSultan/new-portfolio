/**
 * Brand palette — use in JS/JSX: Colors.amberGold, Colors.azureBlue, etc.
 * Tailwind utilities: text-amber-gold, bg-blaze-orange, border-neon-pink, etc.
 */
export const Colors = {
  /** Amber Gold — luxurious yellow, prestige and joyful optimism */
  amberGold: '#ffbe0b',
  /** Blaze Orange — fierce, adventurous, attention-grabbing */
  blazeOrange: '#fb5607',
  /** Neon Pink — explosive vibrance, youthful joy and creativity */
  neonPink: '#ff006e',
  /** Blue Violet — sophisticated, bold creative spirit */
  blueViolet: '#8338ec',
  /** Azure Blue — clear noon sky, bold and optimistic */
  azureBlue: '#3a86ff',
};

/** Human-readable names keyed like Colors */
export const ColorNames = {
  amberGold: 'Amber Gold',
  blazeOrange: 'Blaze Orange',
  neonPink: 'Neon Pink',
  blueViolet: 'Blue Violet',
  azureBlue: 'Azure Blue',
};

/** Tailwind-friendly keys (same hex values as Colors) */
export const tailwindBrandColors = {
  'amber-gold': Colors.amberGold,
  'blaze-orange': Colors.blazeOrange,
  'neon-pink': Colors.neonPink,
  'blue-violet': Colors.blueViolet,
  'azure-blue': Colors.azureBlue,
};
