import type { ToastState } from '@/types'

export type ToastActionId = 'undo' | 'edit'

export interface ToastAction {
  id: ToastActionId
  label: string
}

export function getToastActions(input: {
  toast: ToastState
  hasUndoHandler: boolean
  hasEditHandler: boolean
}): ToastAction[] {
  const { toast, hasUndoHandler, hasEditHandler } = input
  const actions: ToastAction[] = []

  if (toast.showUndo && hasUndoHandler) {
    actions.push({ id: 'undo', label: 'Undo' })
  }

  if (toast.showEdit && hasEditHandler) {
    actions.push({ id: 'edit', label: 'Edit' })
  }

  return actions
}

