import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'


export const TabContractCode = ({ contract, editorOptions }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
      setCode('')
  }, [])

  useEffect(() => {
    if (contract && contract?.code) {
      setCode('')
      setCode(contract.code)
    }
  }, [contract])

  return (
    <Editor
      height="79vh"
      theme="vs-dark"
      defaultLanguage="sol"
      value={code}
      options={editorOptions}
    />
  )
}
