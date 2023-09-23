import styles from './index.module.css'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNetwork } from "wagmi"
import { Tab } from '@headlessui/react'
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useMonaco } from "@monaco-editor/react"
import { TabContractABI } from "../../components/ContractTabs/TabContractABI"
import { TabContractCode } from "../../components/ContractTabs/TabContractCode"
import TabContractRead from "../../components/ContractTabs/TabContractRead"
import TabContractWrite from "../../components/ContractTabs/TabContractWrite"
import TabContractEvents from "../../components/ContractTabs/TabContractEvents"
import ModalProjectSettings from '../../components/Project/modalProjectSettings'
import TabContractTransactions from "../../components/ContractTabs/TabContractTransactions"
import { ArrowTopRightOnSquareIcon, ClipboardIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"
import TabContractReactHooks from '../../components/ContractTabs/TabContractReactHooks'


const editorOptions = {
    scrollBeyondLastLine: false,
    readOnly: true,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    scrollbar: { verticalScrollbarSize: 0 }
}

const PageContract = () => {
    let { projectId, contractId } = useParams()
    const { chain } = useNetwork()
    const [project, setProject] = useState({})
    const [contract, setContract] = useState({})
    const [isOpen, setOpen] = useState(false)
    const projects = useSelector(state => state.projects)
    const monaco = useMonaco()

    useEffect(() => {
        if (projectId && contractId && projects) {
            const project = projects?.find(i => i.id === projectId)
            setProject(project)
            const contract = project?.contracts.find(i => i.id === contractId)
            setContract(contract)
        }
    }, [projectId, contractId, projects])

    useEffect(() => {
        if (monaco && monaco?.editor) {
            monaco.editor.defineTheme('myTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [{ background: '#1f2937' }],
                colors: { 'editor.background': '#1f2937' }
            })
            monaco.editor.setTheme('myTheme')
        }
    }, [monaco])

    const handleOpenInExplorer = () => {
        const explorerUrl = chain?.blockExplorers?.default?.url
        window.open(`${explorerUrl}/address/${contract.address}`, '_blank')
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(contract.address)
        toast.success('Copied to clipboard')
    }

    return (
        <>
            <div className="flex justify-between">
                <div>
                    {(contract?.name && !ethers.utils.isAddress(contract?.name))
                        ?
                        <>
                            <h1 className="text-lg md:text-2xl font-semibold text-gray-900">{contract?.name}</h1>
                            <h2 className="text-sm md:text-lg font-semibold text-gray-500">{project?.name}</h2>
                        </>
                        :
                        <h1 className="text-lg md:text-2xl font-semibold text-gray-900">{project?.name}</h1>
                    }
                    <div className="flex items-center">
                        <h3 className="text-xs md:text-md font-semibold text-gray-500">{contract?.address}</h3>
                        <ClipboardIcon className="w-4 h-6 ml-2 cursor-pointer hover:text-indigo-600" onClick={handleCopyToClipboard} />
                        <ArrowTopRightOnSquareIcon className="w-4 h-6 ml-2 cursor-pointer hover:text-indigo-600" onClick={handleOpenInExplorer} />
                    </div>
                </div>
                <div className="pt-1">
                    <Cog8ToothIcon className="w-6 h-6 cursor-pointer hover:text-indigo-600" onClick={() => setOpen(true)} />
                </div>
            </div>

            <Tab.Group>
                <Tab.List className="border-b border-gray-200 pb-5 sm:pb-0 mt-3 -mb-px flex space-x-6 md:space-x-8 overflow-x-auto">
                    <Tab className={styles.tab}>Read</Tab>
                    <Tab className={styles.tab}>Write</Tab>
                    <Tab className={styles.tab}>Transactions</Tab>
                    <Tab className={styles.tab}>Events</Tab>
                    <Tab className={styles.tab}>ABI</Tab>
                    <Tab className={styles.tab}>Code</Tab>
                    <Tab className={styles.tab}>React</Tab>
                </Tab.List>
                <Tab.Panels className="pt-4">
                    <Tab.Panel>
                        <TabContractRead chain={project?.chain} contract={contract} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TabContractWrite chain={project?.chain} contract={contract} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TabContractTransactions contract={contract} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TabContractEvents contract={contract} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TabContractABI contract={contract} editorOptions={editorOptions} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TabContractCode contract={contract} editorOptions={editorOptions} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <TabContractReactHooks contract={contract} editorOptions={editorOptions} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <ModalProjectSettings project={project} contract={contract} open={isOpen} onClose={() => setOpen(false)} />
        </>
    )
}

export default PageContract
