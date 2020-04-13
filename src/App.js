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
        user: null,
        timestamp: null,
        cardiotheater: null,
        mainfitnessfloor: null,
        plateloadedmachines: null,
        heavyweightroom: null,
        mpr1: null,
        mpr2: null
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
                let tmp1 = [];
                let tmp2 = [];
                let tmp3 = [];
                let tmp4 = [];
                let tmp5 = [];
                let tmp6 = [];
                let tmp7 = [];
                for(let i = 0; i < response.length; i++) {
                    tmp1.push(response[i].timestamp);
                    tmp2.push(response[i].cardiotheater);
                    tmp3.push(response[i].mainfitnessfloor);
                    tmp4.push(response[i].plateloadedmachines);
                    tmp5.push(response[i].heavyweightroom);
                    tmp6.push(response[i].mpr1);
                    tmp7.push(response[i].mpr2);
                }
                this.setState({timestamp: tmp1})
                this.setState({cardiotheater: tmp2})
                this.setState({mainfitnessfloor: tmp3})
                this.setState({plateloadedmachines: tmp4})
                this.setState({heavyweightroom: tmp5})
                this.setState({mpr1: tmp6})
                this.setState({mpr2: tmp7})
                this.setState({data: response})
            });
        }

        //End initialization

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
                    {this.state.data == null && <h1 style={{textAlign: 'center'}}>Loading...</h1>}
                    {this.state.data != null && (
                        <div className="MainContent">
                        <h1 style={{textAlign: 'center'}}>{this.state.timestamp[this.state.timestamp.length -1]}</h1>
                        <div className="Graph">
                        <Graph timestamp={this.state.timestamp} mff={this.state.mainfitnessfloor} ct={this.state.cardiotheater} plm={this.state.plateloadedmachines} hwr={this.state.heavyweightroom} mpr1={this.state.mpr1} mpr2={this.state.mpr2}></Graph>
                        </div>
                        {/*<div className="GraphSmall">*/}
                        {/*<GraphSmall ></GraphSmall>*/}
                        {/*</div>*/}
                        <About/>
                        </div>
                    )}


            </div>
        );
    }

}

export default App;
