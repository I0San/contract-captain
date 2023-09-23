import { useDispatch } from 'react-redux'
import { useContractEvent, useNetwork } from 'wagmi'
import { addEvent } from '../../../app/store/features/events/eventsSlice'
import { addTransaction } from '../../../app/store/features/transactions/transactionsSlice'


export const Event = ({ chainId, contract, event }) => {
    const dispatch = useDispatch()
    const { chain } = useNetwork()
    useContractEvent({
        address: contract?.address ? contract.address : null,
        abi: contract?.abi ? contract.abi : null,
        eventName: event?.name ? event.name : '',
        chainId: chainId,
        async listener(...args) {
            try {
                let _eventData = {}
                event?.inputs.forEach((i, x) => { _eventData[i.name] = args[x] })
                _eventData['event'] = args[args.length - 1]
                let _block = await _eventData['event'].getBlock()
                _eventData['timestamp'] = _block.timestamp * 1000
                _eventData['network'] = chain?.name
                _eventData['chainId'] = chain?.id
                let _tx = await _eventData['event'].getTransaction()
                _tx['timestamp'] = _block.timestamp * 1000
                _tx['network'] = chain?.name
                _tx['chainId'] = chain?.id
                dispatch(addEvent({contractId: contract?.id, address: contract?.address, event: _eventData}))
                dispatch(addTransaction({contractId: contract?.id, address: contract?.address, tx: _tx}))                
            } catch (error) {
                console.log(error)   
            }
        }
    })
    return null
}
