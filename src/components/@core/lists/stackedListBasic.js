import React from 'react'


function StackedListBasic({children}) {
  return (
    <ul className="divide-y divide-gray-200">
        {children}
    </ul>
  )
}

export default StackedListBasic
