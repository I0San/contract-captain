import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { shortenAddress } from '../../app/utils/common'
import { ethers } from 'ethers'
import { useNetwork } from 'wagmi'

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("en-EN")
}

let networks = []
function getExplorerLink(val) {
  const network = networks.find(n => n.id === val)
  return network?.blockExplorers?.default?.url
}

const columns = [
  {
    name: 'Time',
    selector: row => formatDate(row.timestamp),
    sortable: true
  },
  {
    name: 'Network',
    selector: row => row.network,
    sortable: true
  },
  {
    name: 'Txn Hash',
    selector: row => <a href={`${getExplorerLink(row.chainId)}/tx/${row.hash}`} target="_blank" rel="noreferrer">{shortenAddress(row.hash, 3, 2)}</a>,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'Block Number',
    selector: row => <a href={`${getExplorerLink(row.chainId)}/block/${row.blockNumber}`} target="_blank" rel="noreferrer">{row.blockNumber}</a>,
    sortable: true,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'From',
    selector: row => <a href={`${getExplorerLink(row.chainId)}/address/${row.from}`} target="_blank" rel="noreferrer">{shortenAddress(row.from, 3, 2)}</a>,
    sortable: true,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'To',
    selector: row => <a href={`${getExplorerLink(row.chainId)}/address/${row.to}`} target="_blank" rel="noreferrer">{shortenAddress(row.to, 3, 2)}</a>,
    sortable: true,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'Gas Price',
    selector: row => ethers.utils.formatEther(row.gasPrice)
  },
  {
    name: 'Value',
    selector: row => ethers.utils.formatEther(row.value)
  },
]

const paginationOptions = {
  noRowsPerPage: false,
  selectAllRowsItem: true
}

export const GridTransactions = ({ contract }) => {
  const { chains } = useNetwork()
  const contractTransactions = useSelector(state => state.transactions.find(c => c.contractId === contract?.id))
  const [data, setData] = useState([])

  useEffect(() => {
    networks = chains
  }, [chains])

  useEffect(() => {
    if (contractTransactions) {
      setData(contractTransactions.transactions)
    } else {
      setData([])
    }
  }, [contractTransactions])

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginationOptions}
      />
    </div>
  )
}
