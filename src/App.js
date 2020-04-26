import React, {Component} from 'react';
import './App.css';
import Graph from "./components/Graph/Graph";
import GraphSmall from "./components/Graph/GraphSmall";
import Toolbar from './components/Toolbar/Toolbar';
import About from './components/About/About';
import {Stitch, AnonymousCredential, RemoteMongoClient} from "mongodb-stitch-browser-sdk";

// Reformat the timestamp to be more useable/readable
function convertTimestamp(timestamp) {
    // arrays to hold the timestamp info
    let tmp = timestamp.split(' ');
    let month = tmp[1];
    let day = tmp[2];
    let time = tmp[3];
    let year = tmp[5];
    // make month a numerical value
    switch(month) {
        case 'Jan': month = '01'; break;
        case 'Feb': month = '02'; break;
        case 'Mar': month = '03'; break;
        case 'Apr': month = '04'; break;
        case 'May': month = '05'; break;
        case 'Jun': month = '06'; break;
        case 'Jul': month = '07'; break;
        case 'Aug': month = '08'; break;
        case 'Sep': month = '09'; break;
        case 'Oct': month = '10'; break;
        case 'Nov': month = '11'; break;
        case 'Dec': month = '12'; break;
        default: month = '00'; break;
    }
    // return the timestamp in the new format
    return (month + '/' + day + '/' + year + ' ' + time);
}
// return the date of the most recent data
function getDate(timestamp) {
    let tmp = timestamp.split(' ');
    return tmp[0];
}
// returns the time of the most recent data
function getTime(timestamp) {
    let tmp = timestamp.split(' ');
    return tmp[1];
}
//returns true if the timestamp corresponds to the current day
function datesAreOnSameDay(timestamp) {
    let currentDay = new Date();
    let tmpTimestamp = new Date(timestamp);
    if(currentDay.getDate() === tmpTimestamp.getDate() && currentDay.getMonth() === tmpTimestamp.getMonth() && currentDay.getFullYear() === tmpTimestamp.getFullYear()) {
        return true;
    }
    return false;
}
// returns the current data
function getTodaysData(timestamps, dataset) {
    let tmp = [];
    for(let i = 0; i < timestamps.length; i++) {
        if(datesAreOnSameDay(timestamps[i])) {
            tmp.push({x: new Date(timestamps[i]), y:dataset[i]})
        }
    }
    return tmp;
}

class App extends Component {
    // declare the variables in the state
    state = {
        sideDrawerOpen: false, data: null, client: null, db: null,
        user: null, timestamp: null, cardiotheater: null,
        mainfitnessfloor: null, plateloadedmachines: null,
        heavyweightroom: null, mpr1: null, mpr2: null
    }

    render() {
        // Initialize client
        if(this.state.client == null) {
            this.setState({client: Stitch.initializeDefaultAppClient('freemanfreetime-nxcyw')});
        }
        // Initialize the database
        if(this.state.db == null && this.state.client != null) {
            this.setState({db: this.state.client.getServiceClient(RemoteMongoClient.factory,"freemanfreetime-atlas").db("googlesheetsdb")});
        }
        // Initialize the anonymous login
        if(this.state.client != null && this.state.user == null) {
            this.state.client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
                this.setState({user: user})
            });
        }
        // Check for connections and logins
        if(this.state.client != null && this.state.user != null && this.state.db != null && this.state.data == null) {
            this.state.db.collection('gym_records').find({}).asArray().then(response => {
                // temporary arrays hold the sections
                let tmp1 = []; let tmp2 = [];
                let tmp3 = []; let tmp4 = [];
                let tmp5 = []; let tmp6 = [];
                let tmp7 = [];
                for(let i = 0; i < response.length; i++) {
                    // Converts timestamp to be more useable/readable
                    let tmpstamp = convertTimestamp(response[i].timestamp);
                    // Fills the section's data from the database
                    tmp1.push(tmpstamp);
                    tmp2.push(response[i].cardiotheater);
                    tmp3.push(response[i].mainfitnessfloor);
                    tmp4.push(response[i].plateloadedmachines);
                    tmp5.push(response[i].heavyweightroom);
                    // Check if the multipurpose rooms are in use by a party
                    // (reserved)
                    if(isNaN(response[i].mpr1)) {tmp6.push(0);}
                    else {tmp6.push(response[i].mpr1);}
                    if(isNaN(response[i].mpr2)) {tmp7.push(0);}
                    else {tmp7.push(response[i].mpr2);}
                }
                // Assigns the state variables from the temporary array (from the database)
                this.setState({timestamp: tmp1, cardiotheater: tmp2, mainfitnessfloor: tmp3, plateloadedmachines: tmp4, heavyweightroom: tmp5, mpr1: tmp6, mpr2: tmp7, data: response})
            });
        }

        return (
            <div style={{height: '100%'}}>
                {/* Add the toolbar to the page */}
                <Toolbar/>
                <main style={{marginTop: '64px'}}>
                </main>
                    {/* Display text while loading data / there is no data*/}
                    {this.state.data == null && <h1 style={{textAlign: 'center'}}>Loading...</h1>}
                    {/* Displays with non-null data */}
                    {this.state.data != null && (
                        <div className="MainContent">
                        {/* Bar graph and add to page */}
                        <Graph timestamp={this.state.timestamp} mff={this.state.mainfitnessfloor} ct={this.state.cardiotheater} plm={this.state.plateloadedmachines} hwr={this.state.heavyweightroom} mpr1={this.state.mpr1} mpr2={this.state.mpr2}/>
                        <hr/>
                        {/* Line graphs for the different sections */}
                        <div style={{display: 'contents'}}>
                                <GraphSmall mode="MFF" data={getTodaysData(this.state.timestamp, this.state.mainfitnessfloor)}/>
                                <GraphSmall mode="CT" data={getTodaysData(this.state.timestamp, this.state.cardiotheater)}/>
                                <GraphSmall mode="PLM" data={getTodaysData(this.state.timestamp, this.state.plateloadedmachines)}/>
                                <GraphSmall mode="HWR" data={getTodaysData(this.state.timestamp, this.state.heavyweightroom)}/>
                                <GraphSmall mode="MPR1" data={getTodaysData(this.state.timestamp, this.state.mpr1)}/>
                                <GraphSmall mode="MPR2" data={getTodaysData(this.state.timestamp, this.state.mpr2)}/>
                        </div>
                        <hr/>
                        {/* About section/Project information*/}
                        <About/>
                        </div>
                    )}
            </div>
        );
    }
}
export default App;
