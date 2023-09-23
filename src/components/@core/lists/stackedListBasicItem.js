import React from 'react'


function StackedListBasicItem({ title, children }) {
  return (
    <li className="flex items-center justify-between py-4">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>
      {children}
    </li>
  )
}

export default StackedListBasicItem