
export function createGetter(method) {
    
    const capitalize = (e) => {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    const getParams = () => {
        let params = []
        method.inputs.forEach(i => {
            if (i.name) {
                params.push(i.name)
            } else {
                params.push("param_" + i.type)
            }
        })
        return params.join(', ')
    }

    return (`
export const use${capitalize(method.name)} = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState([false])

    const ${method.name} = async (${getParams()}) => {
        try {
            setLoading([true])
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner() 
            const _contract = new ethers.Contract(address, abi, signer)
            const data = await _contract.${method.name}(${getParams()})
            setLoading([false])
            return data
        } catch (error) {
            setError([error])
            return null
        }
    }

    return {
        ${method.name},
        ${method.name}Loading: loading,
        ${method.name}Error: error
    }
}


`
    )
}