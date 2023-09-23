import SidebarMobile from './sidebarMobile'
import SidebarDesktop from './sidebarDesktop'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FolderIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

const navigationPrimary = [
    { name: 'Dashboard', icon: HomeIcon, current: true, href: '/app/dashboard' }
]

const navigationSecondary = [
    { name: 'General', href: '/app/settings', current: false }
]

export default function Navigation({ sidebarOpen, onSidebarClose }) {
    const location = useLocation()
    const projectsList = useSelector(state => state.projects)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        navigationPrimary.forEach(i => {
            i.current = location.pathname === i.href ? true : false
        })
        
        let navigation = projectsList.map(project => {
            return {
                id: project.id,
                name: project.name,
                icon: FolderIcon,
                current: false,
                children: project.contracts.map(contract => {
                    return {
                        id: contract.id,
                        name: contract?.name ? contract.name : contract.address,
                        address: contract.address,
                        href: '/app/' + project.id + '/' + contract.id,
                        current: location.pathname === '/app/' + project.id + '/' + contract.id ? true : false
                    }
                })
            }
        })
        setProjects(navigation)

        navigationSecondary.forEach(s => {
            s.current = location.pathname === s.href ? true : false
        })
    }, [projectsList, location])

    return (
        <>
            <SidebarMobile 
                navigationPrimary={navigationPrimary} 
                navigation={projects}
                navigationSecondary={navigationSecondary}
                sidebarOpen={sidebarOpen} 
                onSidebarClose={onSidebarClose}
            />
            <SidebarDesktop 
                navigationPrimary={navigationPrimary} 
                navigation={projects}
                navigationSecondary={navigationSecondary}
            />
        </>
    )
}