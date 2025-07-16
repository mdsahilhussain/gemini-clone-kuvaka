'use client'

import { useEffect, useState } from 'react'
import { useChatStore } from '@/lib/store/useChatStore'
import Input from './ui/input'

export default function SearchBar() {
  const { setSearch } = useChatStore()
  const [value, setValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(value)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeout)
  }, [value, setSearch])

  return (
    <Input
      type="text"
      placeholder="Search chatrooms..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full mb-4 px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-50"
    />
  )
}