import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Event } from './Event'


const EventsReader = () => {
    const projects = useSelector(state => state.projects)
    const [events, setEvents] = useState([])

    useEffect(() => {
        let _events = []
        projects?.forEach(project => {
            project.contracts?.forEach(contract => {
                if (contract.abi) {
                    try {
                        const abi = JSON.parse(contract?.abi)
                        abi.forEach(f => { if (f.type === "event") { _events.push({ chainId: project.chain, contract: contract, event: f }) } })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        })
        setEvents(_events)
    }, [projects])

    return (
        <>
            {events.length > 0 && 
                <>
                    {events?.map((e, i) => { return (<Event key={i} chainId={e.chainId} contract={e.contract} event={e.event} />) })}
                </>
            }
        </>
    )
}

export default EventsReader