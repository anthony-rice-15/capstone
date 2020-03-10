import React from 'react';
import ReactDOM from 'react-dom';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

const Graph = () => {
    return (
        <XYPlot
            width={300}
            height={300}>
            <HorizontalGridLines />
            <VerticalBarSeries
                data={[
                    {x: 1, y: 26},
                    {x: 2, y: 9},
                    {x: 3, y: 21},
                    {x: 4, y: 31},
                    {x: 5, y: 26},
                    {x: 6, y: 9},
                    {x: 7, y: 21},
                    {x: 8, y: 31}
                ]}/>
            <XAxis />
            <YAxis />
        </XYPlot>
    );
};

export default Graph;