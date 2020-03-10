import React from 'react';
import ReactDOM from 'react-dom';

const AppHeader = () => {
    return (
        <header className="App-header">
            <div className="App-header-logo">
                Freeman Freetime
            </div>
            <div className="App-header-toggler">
                <button className="ui inverted button">About</button>
            </div>
        </header>
    );
};

export default AppHeader;