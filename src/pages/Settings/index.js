import React from 'react'
// import SettingsGeneral from '../../components/Settings/General'
import SettingsProviders from '../../components/Settings/Providers'
import SettingsWorkspace from '../../components/Settings/Workspace'


const PageSettings = () => {
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <div className="py-4">
                {/* <SettingsGeneral /> */}
                <SettingsProviders />
                <SettingsWorkspace />
            </div>
        </>
    )
}

export default PageSettings