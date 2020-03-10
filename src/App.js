import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from "./Graph";

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';

class App extends Component {
    state = {
      sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    };
    backdropClickHandler = () => {
      this.setState({sideDrawerOpen: false})
    };

    render() {
        let backdrop;
        if(this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: '100%'}}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen}/>
                {Backdrop}
                <main style={{marginTop: '64px'}}>
                    <p> page content</p>
                </main>
                <h1 style={{textAlign: 'center'}}>March 9th, 2020</h1>
                <h2 style={{textAlign: 'center'}}>9:31:59PM</h2>
                <div className="Graph">

                    <Graph></Graph>
                </div>
            </div>
        );
    }

}

export default App;
