import React, {Component} from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalBarSeries, LineSeries, Crosshair
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css'

class GraphSmall extends Component{
    state = {
        crosshairValues: []
    }

    getTime(timestamp) {
        console.log(timestamp);
    }

    //Function for managing state of crosshair
    _onMouseLeave = () => {
        this.setState({crosshairValues: []});
    }

    //Function for managing state of crosshair
    _onNearestX = (value, index) => {
        let tmp = value;
        this.getTime(value.x);
        this.setState({crosshairValues: [tmp]})
    }

    render() {
        return (
            <div>
                {this.props.mode === "MFF" && <h2 style={{textAlign: 'center'}}>Main Fitness Floor</h2>}
                {this.props.mode === "CT" && <h2 style={{textAlign: 'center'}}>Cardio Theater</h2>}
                {this.props.mode === "PLM" && <h2 style={{textAlign: 'center'}}>Plate Loaded Machines</h2>}
                {this.props.mode === "HWR" && <h2 style={{textAlign: 'center'}}>Heavy Weight Room</h2>}
                {this.props.mode === "MPR1" && <h2 style={{textAlign: 'center'}}>Multipurpose Room 1</h2>}
                {this.props.mode === "MPR2" && <h2 style={{textAlign: 'center'}}>Multipurpose Room 2</h2>}
                <div className="GraphSmall">
                    <XYPlot
                        xType="time"
                        width={400}
                        height={400}
                        yDomain={[0, 30]}
                        onMouseLeave={this._onMouseLeave}>
                        <LineSeries
                            data={this.props.data}
                            color={"#0A2240"}
                            onNearestX={this._onNearestX}/>
                        <XAxis title="Time" tickTotal={4}/>
                        <YAxis title="People"/>
                        <Crosshair
                        values={this.state.crosshairValues}/>
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default GraphSmall;