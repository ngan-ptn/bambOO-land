/**
 * SearchInput - Reusable search input component.
 * Provides consistent search field styling with icon, clear button, and keyboard support.
 * Used by: FoodSearchBar, settings search, any filter/search UI.
 */

import { forwardRef, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  /** Current input value */
  value: string
  /** Callback when value changes */
  onChange: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Auto-focus on mount */
  autoFocus?: boolean
  /** Callback when clear button is clicked or Escape is pressed */
  onClear?: () => void
  /** Callback when input gains focus */
  onFocus?: () => void
  /** Callback when input loses focus */
  onBlur?: () => void
  /** Additional CSS classes for the container */
  className?: string
  /** Accessible label for the input */
  'aria-label'?: string
}

/**
 * Search input with magnifying glass icon, clear button, and keyboard support.
 * Escape key clears the input if onClear is provided.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      value,
      onChange,
      placeholder = 'Search...',
      autoFocus = false,
      onClear,
      onFocus,
      onBlur,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) {
    // Handle input change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
      },
      [onChange]
    )

    // Handle clear action
    const handleClear = useCallback(() => {
      onChange('')
      onClear?.()
    }, [onChange, onClear])

    // Handle keyboard events: Escape clears input
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape' && value) {
          e.preventDefault()
          handleClear()
        }
      },
      [value, handleClear]
    )

    const hasValue = value.length > 0

    return (
      <div
        className={cn(
          // Container styling: relative for icon positioning
          'relative flex items-center',
          // DLS: Gray 100 background, no border, rounded-md
          'bg-gray-100',
          'rounded-md',
          // DLS: Focus state - white bg with border-2 primary
          'focus-within:bg-white focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1',
          'transition-all duration-200',
          className
        )}
      >
        {/* Search icon - left side */}
        <Search
          size={18}
          className="absolute left-3 text-gray-500 pointer-events-none"
          aria-hidden="true"
        />

        {/* Input field */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={ariaLabel ?? placeholder}
          className={cn(
            // Size and padding: account for icons on both sides, extra height for clear button spacing
            'w-full h-12 pl-10 pr-10',
            // DLS: Typography
            'text-body text-gray-900 placeholder:text-gray-500',
            // Remove default input styling
            'bg-transparent border-none outline-none',
            // Touch target
            'min-h-[48px]'
          )}
        />

        {/* Clear button - only visible when there's text */}
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'absolute right-3',
              'flex items-center justify-center',
              'w-5 h-5 rounded-full',
              // DLS: Scale on hover
              'text-gray-400 hover:text-gray-900 hover:scale-110',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    )
  }
)
