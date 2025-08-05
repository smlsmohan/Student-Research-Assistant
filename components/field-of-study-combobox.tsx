"use client"

import { Combobox } from "@/components/ui/combobox"
import { fieldMap } from "@/lib/dataset-loader"

interface FieldOfStudyComboboxProps {
  value: string
  onValueChange: (value: string) => void
}

export function FieldOfStudyCombobox({ value, onValueChange }: FieldOfStudyComboboxProps) {
  const options = Object.keys(fieldMap).map((key) => ({
    value: key,
    label: key
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }))

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder="Select your field"
      emptyMessage="No field found."
      searchPlaceholder="Search fields..."
    />
  )
}
