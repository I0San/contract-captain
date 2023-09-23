import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function ValidationExlamation() {
    return (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
    )
}