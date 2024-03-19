import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../Styles/Sidebar.css';

import { LogoutHook } from '../Hooks/LogoutHook'

const Sidebar = ({children}) => {
    const { logout } = LogoutHook()
    const handleLogout = () => {
        logout()
    }

    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen)

    const menuItems = [
        {
            name: 'Home',
            path: '/',
            icon: '/assets/icons/home.png'
        },{
            name: 'Dashboard',
            path: '/dashboard',
            icon: '/assets/icons/dash.png'
        },{
            name: 'System Admin',
            path: '/other',
            icon: '/assets/icons/setting.png',
            children: [
                {
                    name: 'Regions',
                    path: '/Regions',
                    icon: '/assets/icons/location.png'
                },{
                    name: 'Users',
                    path: '/Users',
                    icon: '/assets/icons/user.png'
                }
            ]
        },{
            name: 'CID',
            path: '/CID',
            icon: '/assets/icons/investigation.png',
            children: [
                {
                    name: 'Clearances',
                    path: '/Clearance',
                    icon: '/assets/icons/clearances.png'
                },{
                    name: 'Criminal Register',
                    path: '/CriminalRegister',
                    icon: '/assets/icons/handcuffs.png'
                },{
                    name: 'Wanted List',
                    path: '/WantedList',
                    icon: '/assets/icons/wanted.png'
                }
            ]
        },{
            name: 'Occurence Book',
            path: '/OB',
            icon: '/assets/icons/book.png',
            children: [
                {
                    name: 'Incidents',
                    path: '/Incidents',
                    icon: '/assets/icons/incidents.png'
                }
            ]
        },{
            name: 'PSV Inspection',
            path: '/PSVInspection',
            icon: '/assets/icons/inspection.png'
        },
        {
            name: 'Reports',
            path: '/Reports',
            icon: '/assets/icons/file.png'
        },{
            name: 'Edit Profile',
            path: '/Profile',
            icon: '/assets/icons/profile2.png'
        },{
            name: 'Chat',
            path: '/Chat',
            icon: '/assets/icons/chat.png'
        }
    ]

    return (
        <div className="site d-flex flex-column">
            <nav className="navbar px-4">
                <img src="/assets/icons/menu.png" alt="menu-icon" width="20" className="icon menu-icon" onClick={toggle} />
                <a className="navbar-brand" href="/">PPF System</a>
               <div className="ms-auto"><b>A.D</b></div>
            </nav>

            
            <div className="wrapper"> {/* DISPLAY = FLEX */}
                <div className={`sidebar ${isOpen ? '' : 'hide'}`} >
                    <div className="sidebar-top-section">
                        <img src="/assets/icons/profile.png" alt="user-icon" width="40" height="40" className="m-1" />
                        <div className="user-text">
                            User Name<br/>
                            user@gmail.com<br/>
                        </div>
                    </div>

                    {
                        menuItems.map((item, index) => (
                            <span key={index}>
                                {!item.children && <NavLink to={item.path} className='link'>
                                    <img src={item.icon} alt="icon" className="icon" />
                                    <div className="link-text">{item.name}</div>
                                </NavLink>}

                                {item.children && <a href={'#collapseMenu'+index} className='dropdown-toggle link' role='button' data-bs-toggle="collapse" aria-controls="collapseMenu" >
                                    <img src={item.icon} alt="icon" className="icon" />
                                    <div className="link-text">{item.name}</div>
                                </a>}

                                
                                    { item.children &&
                                    <div className="collapseMenu">
                                        <div className="collapse" id={"collapseMenu"+index}>
                                        {item.children && item.children.map((child, indx) => (
                                            <NavLink to={child.path} key={indx} className='link' >
                                                <img src={child.icon} alt="icon" className="icon" />
                                                <div className="link-text" style={{display: isOpen ? 'block':'none'}}>{child.name}</div>
                                            </NavLink>
                                        ))}
                                        </div>
                                    </div>}
                                
                            </span>
                        ))
                    }

                    <div className="otherButtons">
                        <i className="fa-solid fa-right-from-bracket text-danger logout-lnk" onClick={handleLogout}></i>
                    </div>

                </div>
                {/* Children elements e.g divs */}
                {children} 
            </div>
        </div>
    );
}
 
export default Sidebar;