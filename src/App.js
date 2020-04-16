import React, {Component} from 'react';
import './App.css';
import Graph from "./components/Graph/Graph";
import GraphSmall from "./components/Graph/GraphSmall";
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import About from './components/About/About';
import {Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk";

function convertTimestamp(timestamp) {
    let tmp = timestamp.split(' ');
    let month = tmp[1];
    let day = tmp[2];
    let time = tmp[3];
    let year = tmp[5];

    switch(month) {
        case 'Jan':
            month = '01';
            break;
        case 'Feb':
            month = '02';
            break;
        case 'Mar':
            month = '03';
            break;
        case 'Apr':
            month = '04';
            break;
        case 'May':
            month = '05';
            break;
        case 'Jun':
            month = '06';
            break;
        case 'Jul':
            month = '07';
            break;
        case 'Aug':
            month = '08';
            break;
        case 'Sep':
            month = '09';
            break;
        case 'Oct':
            month = '10';
            break;
        case 'Nov':
            month = '11';
            break;
        case 'Dec':
            month = '12';
            break;
        default:
            month = '00';
            break;
    }

    return (day + '/' + month + '/' + year + ' ' + time);
}

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
                    let tmpstamp = convertTimestamp(response[i].timestamp);
                    tmp1.push(tmpstamp);
                    tmp2.push(response[i].cardiotheater);
                    tmp3.push(response[i].mainfitnessfloor);
                    tmp4.push(response[i].plateloadedmachines);
                    tmp5.push(response[i].heavyweightroom);
                    if(isNaN(response[i].mpr1)) {
                        tmp6.push(0);
                    }
                    else {
                        tmp6.push(response[i].mpr1);
                    }
                    if(isNaN(response[i].mpr2)) {
                        tmp7.push(0);
                    }
                    else {
                        tmp7.push(response[i].mpr2);
                    }

                }
                this.setState({timestamp: tmp1, cardiotheater: tmp2, mainfitnessfloor: tmp3, plateloadedmachines: tmp4, heavyweightroom: tmp5, mpr1: tmp6, mpr2: tmp7, data: response})
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
                        <Graph timestamp={this.state.timestamp} mff={this.state.mainfitnessfloor} ct={this.state.cardiotheater} plm={this.state.plateloadedmachines} hwr={this.state.heavyweightroom} mpr1={this.state.mpr1} mpr2={this.state.mpr2}/>
                        <div style={{display: 'contents'}}>
                                <GraphSmall mode="MFF" timestamp={this.state.timestamp} data={this.state.mainfitnessfloor}/>
                                <GraphSmall mode="CT" timestamp={this.state.timestamp} data={this.state.cardiotheater}/>
                                <GraphSmall mode="PLM" timestamp={this.state.timestamp} data={this.state.plateloadedmachines}/>
                                <GraphSmall mode="HWR" timestamp={this.state.timestamp} data={this.state.heavyweightroom}/>
                                <GraphSmall mode="MPR1" timestamp={this.state.timestamp} data={this.state.mpr1}/>
                                <GraphSmall mode="MPR2" timestamp={this.state.timestamp} data={this.state.mpr2}></GraphSmall>
                        </div>
                        <About/>
                        </div>
                    )}


            </div>
        );
    }

}

export default App;
