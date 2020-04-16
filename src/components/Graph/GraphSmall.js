import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalBarSeries, LineSeries
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css'

const GraphSmall = (props) => {
    return (
        <div>
            {props.mode === "MFF" && <h2 style={{textAlign: 'center'}}>Main Fitness Floor</h2>}
            {props.mode === "CT" && <h2 style={{textAlign: 'center'}}>Cardio Theater</h2>}
            {props.mode === "PLM" && <h2 style={{textAlign: 'center'}}>Plate Loaded Machines</h2>}
            {props.mode === "HWR" && <h2 style={{textAlign: 'center'}}>Heavy Weight Room</h2>}
            {props.mode === "MPR1" && <h2 style={{textAlign: 'center'}}>Multipurpose Room 1</h2>}
            {props.mode === "MPR2" && <h2 style={{textAlign: 'center'}}>Multipurpose Room 2</h2>}
            <div className="GraphSmall">
                    <XYPlot
                        xType="time"
                        width={400}
                        height={400}
                        yDomain={[0, 30]}>
                        <LineSeries
                            data={props.data}
                            color={"#0A2240"}/>
                        <XAxis title="X Axis" tickTotal={4}/>
                        <YAxis title="Y Axis"/>
                    </XYPlot>
            </div>
        </div>
    );
}

export default GraphSmall;