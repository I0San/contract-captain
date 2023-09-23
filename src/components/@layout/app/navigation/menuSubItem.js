
import { useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { Link, useHistory } from 'react-router-dom'
import { classNames } from '../../../../app/utils/common'
import { shortenAddress } from '../../../../app/utils/common'
import { deleteContract, updateContractName } from '../../../../app/store/features/projects/projectsSlice'
import { CheckIcon, DocumentTextIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'


export default function MenuSubItem({ item, subItem }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [mouseOver, setMouseOver] = useState(false)
    const [edit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const [value, setValue] = useState(subItem?.name)

    const handleCancelEdit = () => {
        setEdit(false)
        setValue(subItem.name)
    }

    const handleSave = () => {
        dispatch(updateContractName({
            projectId: item.id,
            contractId: subItem.id,
            name: value
        }))
        setEdit(false)
    }

    const handleCancelDelete = () => {
        setDelete(false)
    }

    const handleDelete = () => {
        setDelete(false)
        dispatch(deleteContract({
            projectId: item.id,
            contractId: subItem.id
        }), history.push('/app/dashboard'))
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            if (edit) {
                handleSave()
            } else if (isDelete) {
                handleDelete()
            }
        } else if (event.key === 'Escape') {
            if (edit) {
                handleCancelEdit()
            } else if (isDelete) {
                handleCancelDelete()
            }
        }
    }

    return (
        <>
            {!edit && !isDelete ?
                <>
                    <Link
                        key={subItem.id}
                        to={subItem.href}
                        className={classNames(
                            subItem.current ? 'text-gray-300 bg-gray-700' : 'text-gray-500 ',
                            'group flex w-full items-center justify-between rounded-md py-2 pl-2 pr-2 text-sm font-medium hover:bg-gray-700 hover:text-white'
                        )}
                        onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}
                        data-tooltip-id="address-tooltip"
                        data-tooltip-content={shortenAddress(subItem.address, 6)}
                    >
                        <div className="flex">
                            <DocumentTextIcon className="w-6 h-4 mr-2" />
                            {ethers.utils.isAddress(subItem.name) ? shortenAddress(subItem.name, 6) : subItem.name}
                        </div>
                        {mouseOver &&
                            <div className="flex">
                                <PencilSquareIcon className="w-4 h-4 mr-1 text-gray-300 hover:text-white cursor-pointer" onClick={() => setEdit(true)} />
                                <TrashIcon className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" onClick={() => setDelete(true)} />
                            </div>
                        }
                    </Link>
                    <Tooltip id="address-tooltip" />
                </>
                :
                edit
                    ?
                    <div className="group flex w-full items-center justify-between rounded-md py-2 pl-2 pr-2 text-sm font-medium bg-gray-700">
                        <input
                            className="w-full mr-2 bg-gray-700 border border-solid border-indigo-500 outline-none text-white font-normal"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        ></input>
                        <div className="flex">
                            <CheckIcon className="w-4 h-4 mr-1 text-gray-300 hover:text-white cursor-pointer" onClick={handleSave} />
                            <XMarkIcon className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" onClick={handleCancelEdit} />
                        </div>
                    </div>
                    :
                    <div className="group flex w-full items-center justify-between rounded-md py-2 pl-2 pr-2 text-sm font-medium bg-gray-700">
                        <div className="w-full mr-2 bg-gray-700 text-white font-normal">
                            Delete: {ethers.utils.isAddress(subItem.name) ? shortenAddress(subItem.name, 6) : subItem.name}?
                        </div>
                        <div className="flex">
                            <CheckIcon className="w-4 h-4 mr-1 text-gray-300 hover:text-white cursor-pointer" onClick={handleDelete} />
                            <XMarkIcon className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" onClick={handleCancelDelete} />
                        </div>
                    </div>
            }
        </>
    )
}