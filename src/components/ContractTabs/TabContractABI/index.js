import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'


export const TabContractABI = ({ contract, editorOptions }) => {
    const [abi, setAbi] = useState('');

    useEffect(() => {
        if (contract && contract?.abi) {
            const a = JSON.stringify(JSON.parse(contract?.abi), null, 2)
            setAbi(a)
        }
    }, [contract]);

    return (
        <Editor
            height="79vh"
            theme="vs-dark"
            defaultLanguage="json"
            value={abi}
            options={editorOptions}
        />
    )
}
