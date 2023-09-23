import { useEffect, useState } from 'react'
import { useModal } from 'connectkit'
import { toast } from 'react-hot-toast'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { getFormatedValue } from '../../../../app/utils/common'
import { useAccount, useContractRead, useNetwork, useSwitchNetwork } from 'wagmi'


function Getter({ address, getter }) {
    const { chain } = useNetwork()
    const { isConnected } = useAccount()
    const modal = useModal()
    const { switchNetwork } = useSwitchNetwork()
    const [view, setView] = useState({})
    const [inputs, setInputs] = useState([])
    const [args, setArgs] = useState([])
    const [mustSwitchNetwork, setMustSwitchNetwork] = useState(false)

    useEffect(() => {
        if (!chain || !getter) { return }
        if (chain?.id === parseInt(getter?.chain)) {
            setMustSwitchNetwork(false)
        } else {
            setMustSwitchNetwork(true)
        }
    }, [chain, getter])

    const { data } = useContractRead({
        ...view,
        chainId: getter?.chain ? parseInt(getter.chain) : 1,
        onSuccess(data) {
            console.log(getter.name + '::onSuccess', data)
        },
        onError(error) {
            console.log(getter.name + '::onError', error)
            if (error?.code !== 'CALL_EXCEPTION') {
                toast(error?.message,
                    {
                        icon: '❌',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        }
                    })
            } else if (!error.reason) {
                toast('Call exception! Wrong network?',
                    {
                        id: 'call_exception',
                        icon: '❌',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        }
                    })
            }
        }
    })

    useEffect(() => {
        if (!address || !getter) return
        if (getter?.inputs?.length === 0) {
            setView({
                address: address,
                abi: [getter],
                functionName: getter.name,
                enabled: true,
                watch: true,
                // chainId: getter.chain
            })
        } else {
            let _inputs = []
            let _args = []
            getter.inputs.forEach(i => {
                _inputs.push(i)
                _args.push('')
            })
            setInputs(_inputs)
            setArgs(_args)
        }
    }, [address, getter])

    const handleInput = (e, x) => {
        let temp = args
        temp[x] = e.target.value
        setArgs(temp)
    }

    const handleGet = () => {
        if (!isConnected) {
            modal.setOpen(true)
        } else if (mustSwitchNetwork) {
            switchNetwork(parseInt(getter.chain))
        } else {
            setView({
                address: address,
                abi: [getter],
                functionName: getter.name,
                args: args,
                // enabled: true,
                // watch: true,
                // chainId: getter.chain
            })
        }
    }

    const getLabel = () => {
        return (
            <>
                {getter?.name}
                {getter?.outputs?.length === 0 && <small> ()</small>}
                {getter?.outputs?.length === 1 && <small> ({getter?.outputs[0]?.type})</small>}
                {getter?.outputs?.length > 1 && <small> (...)</small>}
            </>
        )
    }

    return (
        <div className={`overflow-hidden rounded-lg bg-white border border-gray-200 shadow flex flex-col ${inputs?.length > 0 && 'justify-between'}`}>
            <dt className="truncate text-sm font-medium text-gray-500 px-4 pt-5 sm:px-6 sm:pt-6">
                {getLabel()}
            </dt>
            <dd className="mt-1 flex flex-col justify-between">
                <div className="px-4 sm:px-6 pb-2 text-md font-semibold tracking-tight text-gray-900 break-words">
                    {(Array.isArray(data))
                        ?
                        <>
                            {data.map((d, x) => {
                                return (
                                    <p key={x}>{getFormatedValue(d?.toString(), getter?.outputs[x]?.type)} <small className="text-gray-500">({getter?.outputs[x]?.type})</small></p>
                                )
                            })}
                        </>
                        :
                        <>
                            {getFormatedValue(data?.toString(), getter?.outputs[0]?.type)}
                        </>
                    }
                </div>
                {inputs?.length > 0 &&
                    <Disclosure>
                        {({ open }) => (
                            <div className="w-full bg-gray-50 pt-4">
                                <Disclosure.Button className={`${!open && 'pb-4'} flex w-full px-4 sm:px-6 justify-between text-left text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer`}>
                                    <span>Inputs</span>
                                    <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-indigo-600`} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="pt-4 text-sm text-gray-500">
                                    {inputs.map((i, x) => {
                                        return (
                                            <div key={x} className="relative rounded-md border bg-white border-gray-300 px-4 sm:px-6 py-2 mx-4 mb-3 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                                <label htmlFor="name"
                                                    className="absolute -top-2 left-2 -mt-px inline-block bg-white rounded-md px-1 text-xs font-medium text-gray-900">
                                                    {i.name}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                    placeholder={i.type}
                                                    onChange={(e) => handleInput(e, x)}
                                                    required
                                                />
                                            </div>
                                        )
                                    })}
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 mt-1" onClick={handleGet}>{!isConnected ? 'Connect wallet' : mustSwitchNetwork ? 'Switch network' : 'Get'}</button>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                }
            </dd>
        </div>
    )
}

export default Getter
