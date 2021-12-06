import React  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useHistory } from "react-router-dom";

export const AppTopbar = (props) => {

    let history = useHistory();

    const logOut =()=>{

        localStorage.removeItem('u');
        history.push("/");
        window.location.reload();
    }

    return (
        <div className="layout-topbar" style={{display:(props.isAuthenticated ? "":"none")}}>
            <Link to="/list" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/file.jpg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>Documents</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>

                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user"/>
                            <span>Profile</span>
                        </button>
                        {props.loggedUser !== null ?
                            <>
                                {props.loggedUser[0].emailId}
                                <button  className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                                    <i className="pi pi-power-off" onClick={()=>logOut()}/>
                                    <span onClick={()=>logOut()}>log out</span>
                                </button>
                            </>
                            :
                            <>
                            </>
                        }
                    </li>
                </ul>
        </div>
    );
}
