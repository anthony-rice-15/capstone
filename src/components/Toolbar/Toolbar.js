import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="spacer"/>
            <div className="toolbar_logo"><a href="/">Freeman Freetime</a></div>
            <div className="spacer"/>
        </nav>
    </header>
);

export default toolbar;
