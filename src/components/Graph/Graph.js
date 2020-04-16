import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';

const Graph = (props) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Last Updated:</h1>
            <h1 style={{textAlign: 'center'}}>{props.timestamp[props.timestamp.length -1]}</h1>
            <div className="Graph">
                <XYPlot
                    xType="ordinal"
                    width={400}
                    height={400}
                    yDomain={[0,30]}>
                    <HorizontalGridLines />
                    <VerticalGridLines/>
                    <VerticalBarSeries
                        data={[
                            {x: "MFF", y: props.mff[props.mff.length -1]},
                            {x: "CT", y: props.ct[props.ct.length -1]},
                            {x: "PLM", y: props.plm[props.plm.length -1]},
                            {x: "HWR", y: props.hwr[props.hwr.length -1]},
                            {x: "MPR1", y: props.mpr1[props.mpr1.length -1]},
                            {x: "MPR2", y: props.mpr2[props.mpr2.length -1]}
                        ]}/>
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </div>
        </div>
    );
};

export default Graph;
