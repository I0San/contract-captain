import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { SignalIcon } from '@heroicons/react/24/outline'
import { useModal } from 'connectkit'
import { useNetwork } from 'wagmi'


export default function CurrentNetwork() {
    const { chain } = useNetwork()
    const modal = useModal()
    return (
        <>
            <nav className="hidden sm:flex" aria-label="Current connected network">
                <ol className="flex items-center space-x-4">
                    <li>
                        <div>
                            <span className="text-gray-400">
                                <SignalIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only">{chain?.name ? 'Current network' : 'Not connected'}</span>
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => modal.setOpen(true)}>
                                {chain?.name ? chain.name : 'Not connected'}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
        </>
    )
}