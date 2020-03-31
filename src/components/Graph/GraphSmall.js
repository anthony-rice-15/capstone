import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';

const GraphSmall = (props) => {
    return (
        <XYPlot
            xType="ordinal"
            width={300}
            height={300}>
            <HorizontalGridLines />
            <VerticalGridLines/>
            <VerticalBarSeries
                data={[
                    {x: "MFF", y: 18},
                    {x: "CT", y: 10},
                    {x: "PLM", y: 6},
                    {x: "HWR", y: 11},
                    {x: "MPR1", y: 11},
                    {x: "MPR2", y: 26}
                ]}/>
            <XAxis />
            <YAxis />
        </XYPlot>
    );
};

export default GraphSmall;