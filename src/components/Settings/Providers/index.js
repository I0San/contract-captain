import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import CardBasic from '../../@core/cards/cardBasic'
import StackedListBasic from '../../@core/lists/stackedListBasic'
import StackedListBasicItem from '../../@core/lists/stackedListBasicItem'

const SettingsProviders = () => {
    const [alchemyKey, setAlchemyKey] = useState(localStorage.getItem('alchemyKey') || '')
    const [infuraKey, setInfuraKey] = useState(localStorage.getItem('infuraKey') || '')

    useEffect(() => {
        setAlchemyKey(localStorage.getItem('alchemyKey') || '')
        setInfuraKey(localStorage.getItem('infuraKey') || '')
    }, [])

    const handleSave = () => {
        try {
            localStorage.setItem('alchemyKey', alchemyKey)
            localStorage.setItem('infuraKey', infuraKey)
            toast('Providers updated successfully!',
                {
                    icon: '✔️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                })
            window.location.href = '/app/settings'
        } catch (error) {
            toast('Sorry, something went wrong.',
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                })
        }
    }

    return (
        <CardBasic title={'Providers'} subtitle={'By default, the app uses public RPC endpoints'}>
            <div className="divide-y divide-gray-200">
                <StackedListBasic>
                    <StackedListBasicItem title={'Alchemy API Key'}>
                        <input
                            type="text"
                            name="alchemyKey"
                            id="alchemyKey"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm text-center"
                            value={alchemyKey}
                            onChange={(e) => setAlchemyKey(e.target.value)}
                        />
                    </StackedListBasicItem>
                    <StackedListBasicItem title={'Infura API Key'}>
                        <input
                            type="text"
                            name="infuraKey"
                            id="infuraKey"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm text-center"
                            value={infuraKey}
                            onChange={(e) => setInfuraKey(e.target.value)}
                        />
                    </StackedListBasicItem>
                </StackedListBasic>
                <div className="py-4 text-right">
                    <button
                        className="btn"
                        onClick={() => handleSave()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </CardBasic>
    )
}

export default SettingsProviders