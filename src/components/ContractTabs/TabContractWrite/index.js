import React, { useEffect, useState } from 'react'
import Setter from './Setter'


const TabContractWrite = ({ chain, contract }) => {
    const [setters, setSetters] = useState([])

    useEffect(() => {
        if (contract?.abi) {
            try {
                const abi = JSON.parse(contract?.abi)
                let setters = []
                abi.forEach(f => {
                    if (f.type === "function") {
                        if (f.stateMutability === "view") {
                        } else {
                            if (f?.inputs?.length > 0) {
                                setters.push({chain, ...f})
                            } else {
                                setters.unshift({chain, ...f})
                            }
                        }
                    }
                })
                setSetters(setters)
                console.log('setters', setters)
            } catch (error) {
                console.log(error)
            }
        }
    }, [contract, chain])

    return (
        <div>
            {contract &&
                <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {setters.map((s, i) => {
                        return (
                            <Setter key={contract.id + s.name + i} address={contract.address} setter={s} />
                        )
                    })}
                </dl>
            }
        </div>
    )
}

export default TabContractWrite