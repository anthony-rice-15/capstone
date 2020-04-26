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
import Hint from "react-vis/es/plot/hint";

const YMAX = 30;

class GraphSmall extends Component{
    state = {
        value: null
    }

    //Function for managing state of crosshair
    _onMouseLeave = () => {
        this.setState({value: null});
    }

    _rememberValue = value => {
        this.setState({value});
    };

    getTime(timestamp) {
        let tmp = timestamp.split(' ');
        return tmp[0];
    }

    render() {
        const {value} = this.state;
        return (
            <div>
                {this.props.mode === "MFF" && <h2 style={{textAlign: 'center'}}>Main Fitness Floor</h2>}
                {this.props.mode === "CT" && <h2 style={{textAlign: 'center'}}>Cardio Theater</h2>}
                {this.props.mode === "PLM" && <h2 style={{textAlign: 'center'}}>Plate Loaded Machines</h2>}
                {this.props.mode === "HWR" && <h2 style={{textAlign: 'center'}}>Heavy Weight Room</h2>}
                {this.props.mode === "MPR1" && <h2 style={{textAlign: 'center'}}>Multipurpose Room 1</h2>}
                {this.props.mode === "MPR2" && <h2 style={{textAlign: 'center'}}>Multipurpose Room 2</h2>}
                {this.props.data.length === 0 && <h3 style={{textAlign: 'center'}}>There is no data for today yet!</h3> }
                <div className="GraphSmall">
                    <XYPlot
                        xType="time"
                        width={350}
                        height={350}
                        yDomain={[0, YMAX]}
                        onMouseLeave={this._onMouseLeave}>
                        <LineSeries
                            data={this.props.data}
                            color={"#0A2240"}
                            onNearestX={this._rememberValue}/>
                        <XAxis title="Time" tickTotal={4}/>
                        <YAxis title="People"/>
                        {value ? (
                            <LineSeries
                                data={[{x: value.x, y: value.y}, {x: value.x, y: YMAX}]}
                                stroke="black"
                            />
                        ) : null}
                        {value ? (
                            <Hint
                                value={value}
                                align={{horizontal: Hint.ALIGN.AUTO, vertical: Hint.ALIGN.TOP_EDGE}}
                            >
                                <div className="rv-hint__content">{`Time: ${this.getTime(value.x.toTimeString())}`} <br/> {`People: ${Math.trunc(value.y)}`}</div>
                            </Hint>
                        ) : null}
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default GraphSmall;