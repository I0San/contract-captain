
export function createSetter(method) {

    const capitalize = (e) => {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    const getParams = (onlyInput = false) => {
        let params = []
        method.inputs.forEach(i => {
            params.push(i.name)
        })
        if (method.stateMutability === "payable") {
            if (onlyInput) {
                params.push("value")
            } else {
                params.push("{ value: ethers.utils.parseEther(value.toString())}")
            }
        }
        return params.join(', ')
    }

    return (`
export const use${capitalize(method.name)} = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState([false])
    const [tx, setTx] = useState(null)
    const [receipt, setReceipt] = useState(null)

    const ${method.name} = async (${getParams(true)}) => {
        try {
            setLoading([true])
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner() 
            const _contract = new ethers.Contract(address, abi, signer)
            const tx = await _contract.${method.name}(${getParams()}) 
            setTx([tx])
            const receipt = await tx.wait()
            setReceipt([receipt])
            setLoading([false])
            return data
        } catch (error) {
            setError([error])
            return null
        }
    }

    return {
        ${method.name},
        ${method.name}Processing: loading,
        ${method.name}Error: error,
        ${method.name}Tx: tx
        ${method.name}Receipt: receipt
    }
}


`
    )
}