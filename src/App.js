import React, { Component } from 'react'

import LeftPanel from './leftPanel/leftPanel'
import RightPanel from './rightPanel/rightPanel'

import './App.scss';

export default class App extends Component {

  constructor(props) {

    super(props)

    this.state = { data: { numberOfPoints: 200, maxLinksPerPoint: 5} }
  }

  onGenerate(newData) {

    console.log('onGenerate ', newData)

    // make a new copy

    const { data } = this.state

    //if (data.numberOfPoints !== newData.numberOfPoints || data.maxLinksPerPoint !== newData.maxLinksPerPoint) {

      // something changed

      this.setState({data: {...newData}})
    //}
  }

  render() {

    const { data } = this.state

    return (
      <div className="app">
          <LeftPanel data={data} onGenerate={this.onGenerate.bind(this)} />
          <RightPanel numberOfPoints={data.numberOfPoints} maxLinksPerPoint={data.maxLinksPerPoint} /> 
      </div>
    )
  }

}