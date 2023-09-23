import React from 'react'
import styles from '../settings.module.css'
import demoData from '../../../assets/json/demo-data.json'
import CardBasic from '../../@core/cards/cardBasic'
import StackedListBasic from '../../@core/lists/stackedListBasic'
import StackedListBasicItem from '../../@core/lists/stackedListBasicItem'

const SettingsWorkspace = () => {

    const clearWorkspace = () => {
        localStorage.setItem('persist:root', '')
        window.location.href = '/app/dashboard'
    }

    const handleLoadDemoData = () => {
        localStorage.setItem('persist:root', JSON.stringify(demoData))
        window.location.href = '/app/dashboard'
    }

    const exportWorkspace = () => {
        const data = localStorage.getItem('persist:root')
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
        const link = document.createElement("a")
        link.href = jsonString
        link.download = "ContractCapitan-workspace.json"
        link.click()
    }

    const handleFileUpload = e => {
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0], "UTF-8")
        fileReader.onload = e => {
            localStorage.setItem('persist:root', JSON.parse(e.target.result))
            window.location.href = '/app/dashboard'
        }
    }

    return (
        <CardBasic title={'Workspace'} subtitle={'Manage the application projects and contracts workspace'}>
            <StackedListBasic>
                <StackedListBasicItem title={'Export and save your workspace'}>
                    <button className={styles.listItemAction} onClick={() => exportWorkspace()}>
                        Export
                    </button>
                </StackedListBasicItem>
                <StackedListBasicItem title={'Import your workspace from a file'}>
                    <label htmlFor="upload-json" className={styles.listItemAction}>Import</label>
                    <input type="file" name="workspace-json" id="upload-json" className="opacity-0 absolute -z-10" accept=".json" onChange={(e) => handleFileUpload(e)} />
                </StackedListBasicItem>
                <StackedListBasicItem title={'Delete all projects and contracts'}>
                    <button className={styles.listItemAction} onClick={() => clearWorkspace()}>
                        Clear
                    </button>
                </StackedListBasicItem>
                <StackedListBasicItem title={'Load demo projects and smart contracts'}>
                    <button className={styles.listItemAction} onClick={() => handleLoadDemoData()}>
                        Load
                    </button>
                </StackedListBasicItem>
                <StackedListBasicItem title={'Sync workspace using Gist'}>
                </StackedListBasicItem>
            </StackedListBasic>
        </CardBasic>
    )
}

export default SettingsWorkspace