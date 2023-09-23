import Modal from '../@core/modals'
import Label from '../@core/forms/label'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { nanoid } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Listbox, Transition } from '@headlessui/react'
import ValidationError from '../@core/forms/validationError'
import ValidationExlamation from '../@core/forms/validationExlamation'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { addContract, addProject } from '../../app/store/features/projects/projectsSlice'
import { isAddress, isABI, isCode, remove0x, classNames } from '../../app/utils/common'
import { logEvent } from '../../app/utils/googleAnalytics'

const inputWrapStyle = 'relative mt-1 rounded-md shadow-sm'
const noErrorStyle = 'border-gray-300'
const errorStyle = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
const commonStyle = 'block w-full rounded-md shadow-sm pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'


export default function ModalAddContract({ open, onClose }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const projects = useSelector(state => state.projects)
    const [addCode, setAddCode] = useState(false)
    const [selectedProject, setProject] = useState(projects[0])
    const [addNewProject, setAddNewProject] = useState(false)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()

    const onProjectChange = (e) => {
        e === 'add' ? setAddNewProject(true) : setProject(e)
    }

    const isUnique = () => {
        if (watch('newProject')) {
            return !projects.find(p => p.name === watch('newProject'))
        }
    }

    const validateAddress = () => {
        return isAddress(watch("address"))
    }

    const validateABI = () => {
        return isABI(watch("abi"))
    }

    const validateCode = () => {
        return isCode(watch("code"))
    }

    const onSubmit = data => {
        try {
            if (addNewProject) {
                logEvent("Project", "Add", "New")
                const projectId = nanoid()
                const contractId = nanoid()
                dispatch(addProject({
                    id: projectId,
                    name: data.newProject,
                    chain: 1,
                    contracts: [{
                        id: contractId,
                        address: remove0x(data.address),
                        name: '',
                        abi: data.abi,
                        code: data.code
                    }]
                }), history.push('/app/'+projectId+'/' + contractId))
            } else {
                logEvent("Contract", "Add", "New")
                const id = nanoid()
                dispatch(addContract({
                    projectId: selectedProject.id,
                    contract: {
                        id,
                        address: remove0x(data.address),
                        name: remove0x(data.address),
                        abi: data.abi,
                        code: data.code
                    }
                }), history.push('/app/'+selectedProject.id+'/' + id))
            }
            closeModal()
        } catch (error) {
            toast.error("Sorry, something went wrong.")
        }
    }

    const closeModal = () => {
        onClose()
        setAddNewProject(false)
        reset()
    }

    return (
        <Modal open={open} onClose={() => closeModal()} closeIcon={true}>

            <div className="border-b border-gray-200 bg-white px-6 py-5">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Add a contract</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter contract address and ABI
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col items-center justify-center gap-4 w-full px-6 pt-5">

                    {/* PROJECT */}
                    <div className="w-full">
                        {!addNewProject
                            ?
                            <Listbox value={selectedProject} onChange={onProjectChange}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Label className="block text-sm font-medium text-gray-700">Project</Listbox.Label>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                <span className="block truncate">{selectedProject.name}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {projects.map((project, i) => (
                                                        <Listbox.Option
                                                            key={i}
                                                            className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4')}
                                                            value={project}
                                                        >
                                                            {({ selectedProject, active }) => (
                                                                <>
                                                                    <span className={classNames(selectedProject ? 'font-semibold' : 'font-normal', 'block truncate')}>{project.name}</span>
                                                                    {selectedProject ? (
                                                                        <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5')}>
                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                    <Listbox.Option
                                                        className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4')}
                                                        value={'add'}
                                                    >
                                                        <span className="font-normal block truncate">Add new...</span>
                                                    </Listbox.Option>
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                            :
                            <>
                                <Label htmlFor="address" title="Project" />
                                <div className={inputWrapStyle}>
                                    <input
                                        type="text"
                                        id="newProject"
                                        name="newProject"
                                        autoFocus
                                        className={classNames(!errors.newProject ? noErrorStyle : errorStyle, commonStyle)}
                                        {...register("newProject", { required: true, validate: isUnique })}
                                    />
                                    {errors.newProject && <ValidationExlamation />}
                                </div>
                                {errors.newProject && errors.newProject.type === "required" && <ValidationError msg="Project name is a required field." />}
                                {errors.newProject && errors.newProject.type === "validate" && <ValidationError msg="Project name already exists." />}
                            </>
                        }
                    </div>

                    {/* ADDRESS */}
                    <div className="w-full">
                        <Label htmlFor="address" title="Contract address" />
                        <div className={inputWrapStyle}>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="0x..."
                                className={classNames(!errors.address ? noErrorStyle : errorStyle, commonStyle)}
                                {...register("address", { required: true, validate: validateAddress })}
                            />
                            {errors.address && <ValidationExlamation />}
                        </div>
                        {errors.address && errors.address.type === "required" && <ValidationError msg="Contract address is a required field." />}
                        {errors.address && errors.address.type === "validate" && <ValidationError msg="Please enter a valid contract address." />}
                    </div>

                    {/* ABI */}
                    <div className="w-full">
                        <Label htmlFor="abi" title="ABI" />
                        <div className={inputWrapStyle}>
                            <textarea
                                id="abi"
                                name="abi"
                                rows={3}
                                style={{ resize: "none" }}
                                placeholder="[...]"
                                className={classNames(!errors.abi ? noErrorStyle : errorStyle, commonStyle)}
                                {...register("abi", { required: true, validate: validateABI })}
                            />
                            {errors.abi && <ValidationExlamation />}
                        </div>
                        {errors.abi && errors.abi.type === "required" && <ValidationError msg="Contract ABI is a required field." />}
                        {errors.abi && errors.abi.type === "validate" && <ValidationError msg="Please enter a valid contract ABI." />}
                    </div>

                    {/* CODE */}
                    {addCode &&
                        <div className="w-full">
                            <div className="flex justify-between">
                                <Label htmlFor="code" title="Code" />
                                <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer" id="code-optional" onClick={() => setAddCode(false)}>
                                    Hide
                                </span>
                            </div>
                            <div className={inputWrapStyle}>
                                <textarea
                                    id="code"
                                    name="code"
                                    rows={3}
                                    style={{ resize: "none" }}
                                    placeholder="solidity code..."
                                    className={classNames(!errors.code ? noErrorStyle : errorStyle, commonStyle)}
                                    {...register("code", { validate: validateCode })}
                                />
                                {errors.code && <ValidationExlamation />}
                            </div>
                            {errors.code && errors.code.type === "validate" && <ValidationError msg="Could not parse contract code." />}
                        </div>
                    }
                </div>

                {!addCode &&
                    <div className="flex items-start w-full px-6 pt-2">
                        <button className="focus:border-indigo-500 focus:ring-indigo-500" onClick={() => setAddCode(true)}>
                            <span className="text-sm text-gray-500 hover:text-gray-700">+ add contract code</span>
                        </button>
                    </div>
                }

                <div className="mt-5 px-6 py-5 sm:flex sm:flex-row-reverse">
                    <input
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        value={'Add contract'}
                    />
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => closeModal()}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </Modal>
    )
}
