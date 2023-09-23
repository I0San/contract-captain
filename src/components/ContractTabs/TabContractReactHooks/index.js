import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import { createEventListener } from './createEventListener'
import { createGetter } from './createGetter'
import { createSetter } from './createSetter'

const TabContractReactHooks = ({ contract, editorOptions }) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        if (contract && contract?.abi) {
            try {
                let _code =
`/*
*   Generated React Hooks for contract methods (getters, setters, events).
*   Each hook has "loading" and "Error" state.
*   Setters also have "tx" and "receipt" states. 
*
*   Hooks use Ethers. Will add support for others later (Wagmi, Web3) and also TypeScript.
* 
*   Usage: 
*   
*   const { getMethodName, MethodNameLoading, MethodNameError } = useMethodName()
*   
*   const result = await getMethodName()
*
*/
import { ethers } from "ethers"
import { useState } from "react"

const address=YOUR_CONTRACT_ADDRESS
const abi=YOUR_CONTRACT_ABI

`
                const abi = JSON.parse(contract?.abi)
                let getters = []
                let setters = []
                let events = []
                abi.forEach(f => {
                    if (f.type === "function") {
                        // Getters
                        if (f.stateMutability === "view") {
                            if (f?.inputs?.length > 0) {
                                getters.push(f)
                                _code += createGetter(f)
                            } else {
                                getters.unshift(f)
                                _code += createGetter(f)
                            }
                            // Setters (stateMutability=payable/nonpayable)
                        } else {
                            if (f?.inputs?.length > 0) {
                                setters.push(f)
                                _code += createSetter(f)
                            } else {
                                setters.unshift(f)
                                _code += createSetter(f)
                            }
                        }
                        // Events
                    } else if (f.type === "event") {
                        events.push(f)
                        _code += createEventListener(f)
                    }
                })
                setCode(_code)
            } catch (error) {
                console.log(error)
            }
        }
    }, [contract])

    return (
        <Editor
            height="79vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            value={code}
            options={editorOptions}
        />
    )
}

export default TabContractReactHooks