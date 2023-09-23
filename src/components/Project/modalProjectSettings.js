import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNetwork } from 'wagmi'
import { updateContractName, updateProjectName, updateProjectNetwork } from '../../app/store/features/projects/projectsSlice'
import Modal from '../@core/modals'

export default function ModalProjectSettings({ project, contract, open, onClose }) {
    const dispatch = useDispatch()
    const { chain, chains } = useNetwork()
    const [projectName, setProjectName] = useState(project?.name || '')
    const [contractName, setContractName] = useState(contract?.name || '')
    const [network, setNetwork] = useState(chain?.id)

    useEffect(() => {
        if (!chain) return
        setProjectName(project?.name || '')
        setContractName(contract?.name || '')
        setNetwork(project.chain || 1)
    }, [project, contract, chain])

    const handleSave = () => {
        try {
            dispatch(updateProjectName({
                id: project?.id,
                name: projectName
            }))
            dispatch(updateProjectNetwork({
                id: project?.id,
                network: network
            }))
            dispatch(updateContractName({
                projectId: project?.id,
                contractId: contract?.id,
                name: contractName
            }))
            toast('Settings updated successfully!',
            {
                icon: '✔️',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            onClose()
        } catch (error) {
            toast('Sorry, something went wrong.',
            {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
    }

    return (
        <Modal open={open} onClose={() => onClose()} closeIcon={true}>

            <div className="border-b border-gray-200 bg-white px-6 py-5">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Project settings</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Settings for all contracts in the project folder
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-5">
                <div className="grid grid-cols-1 gap-6">

                    <div className="col-span-1">
                        <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                            Project name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                name="project-name"
                                id="project-name"
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Project name"
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                            Contract name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                name="contract-name"
                                id="contract-name"
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                placeholder="Contract name"
                                value={contractName}
                                onChange={e => setContractName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor="project-compiler" className="block text-sm font-medium text-gray-700">
                            Network (all contracts in the project folder)
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <select
                                id="project-compiler"
                                name="project-compiler"
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                value={network}
                                onChange={e => setNetwork(e.target.value)}
                            >
                                {chains?.map((chain, i) => (
                                    <option key={i} value={chain?.id}>{chain?.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-5 px-6 py-5 sm:flex sm:flex-row-reverse border-t border-gray-200">
                <button
                    type="button"
                    className="btn inline-flex w-full justify-center text-base sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleSave()}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => onClose()}
                >
                    Cancel
                </button>
            </div>

        </Modal>
    )
}
