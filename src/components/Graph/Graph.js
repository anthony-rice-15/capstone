import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, LineSeries} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css'
import Hint from "react-vis/es/plot/hint";

class Graph extends Component {
    state = {
        value: null
    }
    // removes hint when mouse leaves
    _onMouseLeave = () => {
        this.setState({value: null});
    }
    // sets the value of the hint when the mouse is on the graph
    _rememberValue = value => {
        this.setState({value});
    }
    render() {
        const {value} = this.state;
        return (
            <div>
                {/* Tell user when the data was last updated */}
                <h1 style={{textAlign: 'center'}}>Last Updated:</h1>
                <h1 style={{textAlign: 'center'}}>{this.props.timestamp[this.props.timestamp.length - 1]}</h1>
                {/* The bar graph */}
                <div className="Graph">
                    {/* Set the size/layout of the graph */}
                    <XYPlot
                        xType="ordinal"
                        width={350}
                        height={350}
                        yDomain={[0, 30]}
                        onMouseLeave={this._onMouseLeave}
                        color={"#0A2240"}>
                        {/* Create the grid for the graph*/}
                        <HorizontalGridLines/>
                        <VerticalGridLines/>
                        {/* Creates the bars for the graph from the data */}
                        <VerticalBarSeries
                            data={[
                                {x: "MFF", y: this.props.mff[this.props.mff.length - 1]},
                                {x: "CT", y: this.props.ct[this.props.ct.length - 1]},
                                {x: "PLM", y: this.props.plm[this.props.plm.length - 1]},
                                {x: "HWR", y: this.props.hwr[this.props.hwr.length - 1]},
                                {x: "MPR1", y: this.props.mpr1[this.props.mpr1.length - 1]},
                                {x: "MPR2", y: this.props.mpr2[this.props.mpr2.length - 1]}
                            ]}
                            /* The hint and assigns the value */
                            onNearestX={this._rememberValue}
                        />
                        <XAxis />
                        <YAxis title="# of People"/>
                        {/* Create the hint, assigns value and location*/}
                        {value ? (
                            <Hint
                                value={value}
                                align={{horizontal: 'auto', vertical: 'top'}}
                            >
                                {/* Sets the type of hint and declares the value type*/}
                                {value.y !== 0.1 && <div className="rv-hint__content">{`People: ${Math.trunc(value.y)}`}</div>}
                                {value.y === 0.1 && <div className="rv-hint__content">{`The room is reserved at this time`}</div>}
                            </Hint>
                        ) : null}
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default Graph;
