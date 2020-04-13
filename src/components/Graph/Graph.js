import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';

const Graph = (props) => {
    return (
        <XYPlot
            xType="ordinal"
            width={300}
            height={300}>
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
    );
};

export default Graph;
