import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectKitButton } from 'connectkit'
import { Link } from 'react-router-dom'
import { classNames } from '../../../../app/utils/common'

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'App', href: '/app/dashboard', current: false },
    { name: 'GitHub', href: '/', current: false },
]

export default function Navigation() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="border-b border-gray-700">
                            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="h-8 w-8" src="/img/logo-indigo.png" alt="Contract Captain" />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <ConnectKitButton />
                                    </div>
                                </div>

                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                        <div className="space-y-1 px-2 py-3 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}