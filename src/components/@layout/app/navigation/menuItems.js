import { useState } from 'react'
import MenuItem from './menuItem'
import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import ModalAddContract from '../../../AddContract/modalAddContract'
import { classNames } from '../../../../app/utils/common'


export default function MenuItems({ navigationPrimary, navigation, navigationSecondary }) {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className="flex flex-1 flex-col overflow-y-auto">

            {/* NAV PRIMARY */}
            <nav className=" px-2 py-4">
                {navigationPrimary.map((item) =>
                    <MenuItem item={item} key={item.name} />
                )}
            </nav>
            {/* END NAV PRIMARY */}

            <div className="flex items-center justify-between pr-3">
                <h3 className="px-3 text-sm font-medium text-gray-500">
                    Projects
                </h3>
                <button
                    type="button"
                    className="flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(true)}
                >
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Add project</span>
                </button>
            </div>

            {/* NAV */}
            <nav className="px-2 py-4">
                {navigation.map((item, i) =>
                    <MenuItem item={item} key={i} />
                )}
            </nav>
            {/* END NAV */}

            <div className="pr-3">
                <h3 className="px-3 text-sm font-medium text-gray-500">
                    Settings
                </h3>
                <div className="space-y-1 py-2" role="group" aria-labelledby="projects-headline">
                    {navigationSecondary.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current ? 'text-gray-300 bg-gray-700' : 'text-gray-500 ',
                                'group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:text-gray-300'
                            )}
                        >
                            <span className="truncate">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <ModalAddContract open={isOpen} onClose={() => setOpen(false)} />
        </div>
    )
}