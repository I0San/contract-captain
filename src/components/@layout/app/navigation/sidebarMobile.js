import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import MenuItems from './menuItems'


export default function SidebarMobile({ navigationPrimary, navigation, navigationSecondary, sidebarOpen, onSidebarClose }) {
    const [isOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        setSidebarOpen(sidebarOpen)
    }, [sidebarOpen])

    const handleClose = () => {
        setSidebarOpen(false)
        onSidebarClose()
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={handleClose}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>

                            <div className="flex flex-shrink-0 items-center px-4">
                                <Link to="/">
                                    <img className="h-8 w-8" src="/img/logo-indigo.png" alt="Contract Captain" />
                                </Link>
                                <span className="ml-4 font-bold text-lg text-white">Contract Captain</span>
                            </div>

                            <MenuItems navigationPrimary={navigationPrimary} navigation={navigation} navigationSecondary={navigationSecondary}/>

                        </Dialog.Panel>
                    </Transition.Child>
                    <div className="w-14 flex-shrink-0" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}