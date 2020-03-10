import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolbar_toggle_button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar_logo"><a href="/">THE LOGO</a></div>
            <div className="spacer"/>
            <div className="toolbar_navigation_items">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Historical</a></li>
                    <li><a href="/">About</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;
