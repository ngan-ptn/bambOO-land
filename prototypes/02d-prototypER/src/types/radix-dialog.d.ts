/**
 * Minimal type shims for `@radix-ui/react-dialog` used by the BottomSheet.
 * This keeps TypeScript happy in environments where the real library types
 * are not available, without constraining the implementation details.
 */

declare module '@radix-ui/react-dialog' {
  import type React from 'react'

  /** Generic props shape Radix primitives accept; deliberately loose. */
  export interface DialogPrimitiveProps {
    children?: React.ReactNode
    [key: string]: unknown
  }

  /**
   * Root dialog component. We only care that `open` and `onOpenChange`
   * exist so our BottomSheet control logic type-checks.
   */
  export const Root: React.ComponentType<
    DialogPrimitiveProps & { open?: boolean; onOpenChange?: (open: boolean) => void }
  >

  export const Portal: React.ComponentType<DialogPrimitiveProps>
  export const Overlay: React.ComponentType<DialogPrimitiveProps>
  export const Content: React.ComponentType<DialogPrimitiveProps>
  export const Title: React.ComponentType<DialogPrimitiveProps>
  export const Description: React.ComponentType<DialogPrimitiveProps>
}
