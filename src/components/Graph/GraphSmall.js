import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    HorizontalBarSeries
} from 'react-vis';

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
                        yType="ordinal"
                        width={400}
                        height={400}
                        xDomain={[0,30]}
                        margin={{left: "150"}}>
                        <HorizontalGridLines />
                        <VerticalGridLines/>

                        <HorizontalBarSeries
                            data={[
                                {x: props.data[props.data.length -1], y: props.timestamp[props.timestamp.length -1]},
                                {x: props.data[props.data.length -2], y: props.timestamp[props.timestamp.length -2]},
                                {x: props.data[props.data.length -3], y: props.timestamp[props.timestamp.length -3]},
                                {x: props.data[props.data.length -4], y: props.timestamp[props.timestamp.length -4]},
                                {x: props.data[props.data.length -5], y: props.timestamp[props.timestamp.length -5]},
                                {x: props.data[props.data.length -6], y: props.timestamp[props.timestamp.length -6]},
                                {x: props.data[props.data.length -6], y: props.timestamp[props.timestamp.length -7]},
                                {x: props.data[props.data.length -6], y: props.timestamp[props.timestamp.length -8]},
                                {x: props.data[props.data.length -6], y: props.timestamp[props.timestamp.length -9]},
                                {x: props.data[props.data.length -6], y: props.timestamp[props.timestamp.length -10]}
                            ]}/>
                        <XAxis />
                        <YAxis />
                    </XYPlot>
            </div>
        </div>

    );
};

export default GraphSmall;