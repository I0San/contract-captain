import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { classNames } from '../../../../app/utils/common'
import MenuSubItem from './menuSubItem'


export default function MenuItem({ item }) {

    const hasAnyActiveChildren = () => {
        if (item.children) {
            return item.children.some((child) => child.current)
        }
        return false
    }

    if (!item.children) {
        return (
            // LEVEL 1
            <div key={item.name}>
                <Link
                    to={item.href}
                    className={classNames(
                        item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    )}
                >
                    <item.icon
                        className={classNames(
                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                    {item.name}
                </Link>
            </div>
        )
    } else {
        return (
            // LEVEL 2
            <Disclosure as="div" key={item.name} defaultOpen={hasAnyActiveChildren()} className="space-y-1">
                {({ open }) => (
                    <>
                        <Disclosure.Button
                            className={classNames(
                                item.current
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none'
                            )}
                        >
                            <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-300" aria-hidden="true" />
                            <span className="flex-1">{item.name}</span>
                            <svg
                                className={classNames(
                                    open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                    'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                        </Disclosure.Button>

                        <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                                <MenuSubItem key={subItem.id} item={item} subItem={subItem} />
                            ))}
                        </Disclosure.Panel>

                    </>
                )}
            </Disclosure>
        )
    }
}