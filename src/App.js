import React, {Component} from 'react';
import './App.css';
import Graph from "./components/Graph/Graph";
import GraphSmall from "./components/Graph/GraphSmall";
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import About from './components/About/About';
import {data} from "./stitch/mongodb";

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
        console.log("this is the data:");
        console.log(data);
        let backdrop = 1;
        if(this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: '100%'}}>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen} />
                {Backdrop}
                <main style={{marginTop: '64px'}}>

                </main>
                <h1 style={{textAlign: 'center'}}>March 9th, 2020</h1>
                <h2 style={{textAlign: 'center'}}>9:31:59PM</h2>
                <div className="Graph">
                    <Graph/>
                </div>
                <div className="GraphSmall">
                    <GraphSmall></GraphSmall>
                </div>
                <About/>
            </div>
        );
    }

}

export default App;
