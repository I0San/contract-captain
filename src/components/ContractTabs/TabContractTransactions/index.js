import React from 'react'
import { GridTransactions } from '../../DataTable/gridTransactions'


const TabContractTransactions = ({ contract }) => {
    return (
        <GridTransactions contract={contract} />
    )
}

export default TabContractTransactions