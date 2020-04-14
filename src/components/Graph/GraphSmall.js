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
        <div className="GraphSmall">
            {props.mode === "MFF" && <h2>Main Fitness Floor</h2>}
            {props.mode === "CT" && <h2>Cardio Theater</h2>}
            {props.mode === "PLM" && <h2>Plate Loaded Machines</h2>}
            {props.mode === "HWR" && <h2>Heavy Weight Room</h2>}
            {props.mode === "MPR1" && <h2>Multipurpose Room 1</h2>}
            {props.mode === "MPR2" && <h2>Multipurpose Room 2</h2>}
            <div >
                <XYPlot
                    yType="ordinal"
                    width={300}
                    height={300}
                    xDomain={[0,30]}>
                    <HorizontalGridLines />
                    <VerticalGridLines/>
                    <HorizontalBarSeries
                        data={[
                            {x: props.data[props.data.length -1], y: props.timestamp[props.timestamp.length -1]},
                            {x: props.data[props.data.length -2], y: props.timestamp[props.timestamp.length -2]},
                            {x: props.data[props.data.length -3], y: props.timestamp[props.timestamp.length -3]},
                            {x: props.data[props.data.length -4], y: props.timestamp[props.timestamp.length -4]},
                            {x: props.data[props.data.length -5], y: props.timestamp[props.timestamp.length -5]},
                            {x: props.data[props.data.length -6], y: props.timestamp[props.timestamp.length -6]}
                        ]}/>
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </div>
        </div>
    );
};

export default GraphSmall;