import { BottomSheet } from '@/components/common/BottomSheet'
import { ManualEntryForm, type ManualEntryInput } from './ManualEntryForm'

interface ManualEntryModalProps {
  /** Controls modal visibility */
  isOpen: boolean
  /** Called when modal should close */
  onClose: () => void
  /** Initial value for the name field (e.g., from search query) */
  initialName?: string
  /** Called when user saves the form with valid data */
  onSave: (input: ManualEntryInput) => void
}

export function ManualEntryModal({
  isOpen,
  onClose,
  initialName = '',
  onSave,
}: ManualEntryModalProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      showDragHandle={true}
      size="auto"
      description="Add a custom food entry"
    >
      {/* Key forces form remount when initialName changes, resetting all fields */}
      <ManualEntryForm
        key={initialName}
        initialName={initialName}
        onSave={onSave}
        onCancel={onClose}
        cancelLabel="Cancel"
        saveLabel="Save"
      />
    </BottomSheet>
  )
}
