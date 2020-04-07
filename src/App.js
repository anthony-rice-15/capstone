import React, {Component} from 'react';
import './App.css';
import Graph from "./components/Graph/Graph";
import GraphSmall from "./components/Graph/GraphSmall";
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import About from './components/About/About';
import {Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk";

class App extends Component {
    state = {
      sideDrawerOpen: false,
        data: null,
        client: null,
        db: null,
        user: null
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    };
    backdropClickHandler = () => {
      this.setState({sideDrawerOpen: false})
    };

    render() {
        //Initialize client and database
        if(this.state.client == null) {
            this.setState({client: Stitch.initializeDefaultAppClient('freemanfreetime-nxcyw')});
        }
        if(this.state.db == null && this.state.client != null) {
            this.setState({db: this.state.client.getServiceClient(RemoteMongoClient.factory,"freemanfreetime-atlas").db("googlesheetsdb")});
        }
        if(this.state.client != null && this.state.user == null) {
            this.state.client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
                this.setState({user: user})
            });
        }
        if(this.state.client != null && this.state.user != null && this.state.db != null && this.state.data == null) {
            this.state.db.collection('gym_records').find({}).asArray().then(response => {
                this.setState({data: response})
            });
        }

        let backdrop = 1;
        if(this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        //This is where I'm trying to load the data for use in state
        //Currently coming up with errors I can't solve.
        //this.loadData(db);
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
                    <Graph></Graph>
                </div>
                <div className="GraphSmall">
                    <GraphSmall ></GraphSmall>
                </div>
                <About/>
            </div>
        );
    }

}

export default App;
