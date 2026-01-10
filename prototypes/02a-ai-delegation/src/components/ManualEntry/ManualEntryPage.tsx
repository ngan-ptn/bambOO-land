import { ManualEntryForm, type ManualEntryInput } from './ManualEntryForm'

interface ManualEntryPageProps {
  onBack: () => void
  onSave: (input: ManualEntryInput) => void
}

export function ManualEntryPage({ onBack, onSave }: ManualEntryPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="px-5 py-6">
        <ManualEntryForm
          onSave={onSave}
          onCancel={onBack}
          cancelLabel="Back"
          saveLabel="Save"
        />
      </main>
    </div>
  )
}
