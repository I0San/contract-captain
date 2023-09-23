import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Label from '../@core/forms/label'
import ValidationError from '../@core/forms/validationError'
import ValidationExlamation from '../@core/forms/validationExlamation'
import { addContract } from '../../app/store/features/projects/projectsSlice'
import { isAddress, isABI, isCode, remove0x, classNames } from '../../app/utils/common'
import { toast } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { nanoid } from '@reduxjs/toolkit'
import { logEvent } from '../../app/utils/googleAnalytics'

const inputWrapStyle = 'relative mt-1 rounded-md shadow-sm'
const noErrorStyle = 'border-gray-300'
const errorStyle = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
const commonStyle = 'block w-full rounded-md shadow-sm pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'


export default function LandingAddContract() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [addCode, setAddCode] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

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
            logEvent("Contract", "Add", "Landing")
            const id = nanoid()
            dispatch(addContract({
                projectId: 'IoSanX696IQBDnOmIs', // 'Default'
                contract: {
                    id,
                    address: remove0x(data.address),
                    name: remove0x(data.address),
                    abi: data.abi,
                    code: data.code
                }
            }), history.push('/app/IoSanX696IQBDnOmIs/' + id))
        } catch (error) {
            toast.error("Sorry, something went wrong.")
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col items-center justify-center gap-4 w-full px-6 pt-5">

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
                <button
                    type="submit"
                    className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center inline-flex items-center"
                >
                    GO
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
            </div>

        </form>
    )
}
