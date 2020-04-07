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
        data: []
    };

    //function for loading data from database using asynchronous call
    loadData = async (db) => {
        const response = await db.collection('gym_records').find({}).asArray();
        this.setState({data: response});
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
        const client = Stitch.initializeAppClient('freemanfreetime-nxcyw');
        const db = client.getServiceClient(RemoteMongoClient.factory,"freemanfreetime-atlas").db("googlesheetsdb");
        client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
            console.log(`logged in anonymously as user ${user.id}`)
        });

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
