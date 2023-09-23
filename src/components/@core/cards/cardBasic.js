import React from 'react'

function CardBasic({ title, subtitle, children }) {
    return (
        <div className="bg-white border border-gray-200 shadow rounded-md md:rounded-lg mb-6">

            <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
                {subtitle &&
                    <p className="mt-1 text-sm text-gray-500">
                        {subtitle}
                    </p>
                }
            </div>
            <div className="px-4 sm:px-6">
                {children}
            </div>
        </div>
    )
}

export default CardBasic