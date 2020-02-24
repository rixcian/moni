import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import MoniLogo from '../../assets/img/moni.png';
import WhaleIcon from '../../assets/icons/whale.svg';

const Sidebar: React.FC = (props) => {

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  let mainRef: HTMLDivElement | null;

  const getSidebarWidth = (): string => {
    const sidebarEl = sidebarRef && sidebarRef.current;
    return sidebarEl ? window.getComputedStyle(sidebarEl).getPropertyValue('width') : '0px';
  }

  const toggleSidebar = (pixelWidth: string): void => {
    sidebarRef.current?.setAttribute('style', `left: ${pixelWidth}`)
  }

  const autoToggleSidebar = (): void => {
    if (window.innerWidth > 992) {
      setShowSidebar(true);
      toggleSidebar('0px');
      if (mainRef)
        mainRef.style.width = 'calc(100vw - 260px)';
    } else {
      setShowSidebar(false);
      toggleSidebar(`-${getSidebarWidth()}`);
      if (mainRef)
        mainRef.style.width = '100vw';
    }
  }

  const toggleSidebarOnClick = (): void => {
    mainRef = document.querySelector('.main');
    if (showSidebar) {
      toggleSidebar(`-${getSidebarWidth()}`);
      if (mainRef)
        mainRef.style.width = '100vw';
    } else {
      toggleSidebar('0px');
      if (mainRef && window.innerWidth > 992)
        mainRef.style.width = 'calc(100vw - 260px)';
    }
    
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    mainRef = document.querySelector('.main');
    autoToggleSidebar();
    window.addEventListener('resize', autoToggleSidebar);
  }, [])

  return (
    <div ref={sidebarRef} className="sidebar">
      <div className="menu-icon-wrapper" onClick={toggleSidebarOnClick}>
        {showSidebar
          ? (<FontAwesomeIcon icon="times" className="menu-icon" />)
          : (<FontAwesomeIcon icon="bars" className="menu-icon" />)
        }
      </div>
      <div className="menu">
        <div className="menu-header">
          <img src={MoniLogo} alt="Moni. | Server Monitoring" />
          <h2>Moni.</h2>
        </div>
        <div className="menu-items">
          <NavLink to="/" className="menu-item" activeClassName="menu-item-active" exact>
            <FontAwesomeIcon icon="map" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/cpu" className="menu-item" activeClassName="menu-item-active">
            <FontAwesomeIcon icon="microchip" />
            <span>CPU</span>
          </NavLink>
          <NavLink to="/memory" className="menu-item" activeClassName="menu-item-active">
            <FontAwesomeIcon icon="memory" />
            <span>Memory</span>
          </NavLink>
          <NavLink to="/docker" className="menu-item" activeClassName="menu-item-active">
            <ReactSVG src={WhaleIcon} />
            <span>Docker</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;