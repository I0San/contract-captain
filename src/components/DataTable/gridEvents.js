import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { shortenAddress } from '../../app/utils/common'
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
    name: 'Block',
    selector: row => row.event.blockNumber
  },
  {
    name: 'Event',
    selector: row => row.event.event,
    sortable: true,
  },
  {
    name: 'Txn Hash',
    selector: row => <a href={`${getExplorerLink(row.chainId)}/tx/${row.event.transactionHash}`} target="_blank" rel="noreferrer">{shortenAddress(row.event.transactionHash, 8, 2)}</a>,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  }
]

const paginationOptions = {
  noRowsPerPage: false,
  selectAllRowsItem: true
}

export const GridEvents = ({ contract }) => {
  const { chains } = useNetwork()
  const contractEvents = useSelector(state => state.events.find(c => c.contractId === contract?.id))
  const [data, setData] = useState([])

  useEffect(() => {
    networks = chains
  }, [chains])

  useEffect(() => {
    if (contractEvents) {
      setData(contractEvents.events)
    } else {
      setData([])
    }
  }, [contractEvents])

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
