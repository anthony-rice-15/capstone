import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';
import Hint from "react-vis/es/plot/hint";

// TODO HINTS TO THE BAR GRAPH

class Graph extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Last Updated:</h1>
                <h1 style={{textAlign: 'center'}}>{this.props.timestamp[this.props.timestamp.length - 1]}</h1>
                <div className="Graph">
                    <XYPlot
                        xType="ordinal"
                        width={400}
                        height={400}
                        yDomain={[0, 30]}
                        color={"#0A2240"}>
                        <HorizontalGridLines/>
                        <VerticalGridLines/>
                        <VerticalBarSeries
                            data={[
                                {x: "MFF", y: this.props.mff[this.props.mff.length - 1]},
                                {x: "CT", y: this.props.ct[this.props.ct.length - 1]},
                                {x: "PLM", y: this.props.plm[this.props.plm.length - 1]},
                                {x: "HWR", y: this.props.hwr[this.props.hwr.length - 1]},
                                {x: "MPR1", y: this.props.mpr1[this.props.mpr1.length - 1]},
                                {x: "MPR2", y: this.props.mpr2[this.props.mpr2.length - 1]}
                            ]}
                            onNearestX={this._onNearestX}
                        />
                        <XAxis/>
                        <YAxis/>

                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default Graph;
