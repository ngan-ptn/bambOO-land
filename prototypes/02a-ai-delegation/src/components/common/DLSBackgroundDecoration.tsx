/**
 * DLS Background Decoration - Geometric shapes for flat design aesthetic.
 * Adds visual interest without breaking flat design principles.
 * Uses DLS colors (muted, primary, secondary, accent) at low opacity.
 */

import { cn } from '@/lib/utils'

interface DecorationProps {
  /** Shape type */
  shape?: 'circle' | 'square' | 'rectangle'
  /** Size class (from DLS spacing scale) */
  size?: string
  /** DLS color variant */
  color?: 'muted' | 'primary' | 'secondary' | 'accent'
  /** Position classes */
  className?: string
}

export function DLSBackgroundDecoration({
  shape = 'circle',
  size = 'w-96 h-96',
  color = 'muted',
  className,
}: DecorationProps) {
  const shapeStyles = {
    circle: 'rounded-full',
    square: '',
    rectangle: 'rounded-lg',
  }

  const colorStyles = {
    muted: 'bg-muted/10',
    primary: 'bg-primary/5',
    secondary: 'bg-secondary/5',
    accent: 'bg-accent/5',
  }

  return (
    <div
      className={cn(
        // DLS: Absolute positioning for background decoration
        'absolute',
        // DLS: No interaction (purely visual)
        'pointer-events-none',
        'z-0',
        shapeStyles[shape],
        colorStyles[color],
        size,
        className
      )}
    />
  )
}
