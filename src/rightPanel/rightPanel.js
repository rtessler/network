import React, { Component } from 'react'
import Network from '../model/network'

import './rightPanel.scss'

export default class RightPanel extends Component {

  constructor(props) {

    super(props)

    this.network = new Network(parseInt(props.numberOfPoints), parseInt(props.maxLinksPerPoint))
  }

  componentDidMount() {

    this.createCanvas()
    window.addEventListener('resize', this.resize)
  }

  resize = () => { 

    // console.log('resize')

    // this.createCanvas()  
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  componentDidUpdate(prevProps) {

    // console.log('RightPanel.componentDidUpdate props :', this.props.data)
    // console.log('RightPanel.componentDidUpdate prevProps :', prevProps.data)
    // console.log('RightPanel.componentDidUpdate prevState :', prevState.data)

    // if (this.props.numberOfPoints !== prevProps.numberOfPoints || 
    //   this.props.maxLinksPerPoint !== prevProps.maxLinksPerPoint) {


      console.log(`RightPanel.componentDidUpdate: data change`)

      // update the network

      this.network.numberOfPoints = parseInt(this.props.numberOfPoints)
      this.network.maxLinksPerPoint = parseInt(this.props.maxLinksPerPoint)
      this.network.generate()
      this.drawNetwork()
    //}
  }

  createCanvas()
	{
		// cant sepecify canvas width and height in css, have to do it in canvas html

		var e = document.getElementsByClassName("canvas-container")[0];

		if (!e)
			console.log("createCanvas: cannot find canvas-container");

    var q = document.getElementsByClassName("right-panel")[0];

    const margin = 10

		var w = q.clientWidth - 2 * margin;
		var h = q.clientHeight - 2 * margin;

		var x = document.createElement("canvas");

		x.setAttribute("id", "canvas");
		x.setAttribute("width", w);
    x.setAttribute("height", h);
    
    console.log(`RightPanel.createCanvas: ${w}, ${h}`)

    e.appendChild(x);

    this.network.width = w
    this.network.height = h
    this.network.generate()
    this.drawNetwork()
  }

	drawCircle(i)
	{
    let pt = this.network.points[i]

		const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    const radius = 5

		context.beginPath()
    context.arc(pt.x, pt.y, radius, 0, 2 * Math.PI, false)
    
    if (this.network.mostDistantPairOfPoints[0] === i )
      context.fillStyle = "rgba(0, 0, 255, 1)"
    else if (this.network.mostDistantPairOfPoints[1] === i )
      context.fillStyle = "rgba(0, 0, 255, 1)"
    else
      context.fillStyle = "rgba(255, 0, 0, 1)"
      
		context.fill()
  }
  
  drawLine(edge) {

    const c = document.getElementById("canvas")
    const ctx = c.getContext("2d")

    const a = this.network.points[edge[0]]
    const b = this.network.points[edge[1]]

    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = "#ccc";
    ctx.stroke()
  }

  drawPath() {

    const c = document.getElementById("canvas")
    const ctx = c.getContext("2d")

    ctx.beginPath()
    

    this.network.path.forEach((index,i) => {

      const pt = this.network.points[index]

      if (i === 0)
        ctx.moveTo(pt.x, pt.y)
      else {
        ctx.lineTo(pt.x, pt.y)
        ctx.strokeStyle = "#00ff00";
        ctx.stroke()
      }

    })

  }
  
  drawNetwork() {

    console.log('drawNetwork ', this.network.points.length)

		const canvas = document.getElementById('canvas')
		const context = canvas.getContext('2d')

		context.clearRect(0, 0, canvas.width, canvas.height)

		for (let i = 0, len = this.network.points.length; i < len; i++)
      this.drawCircle(i)
      
    for (let i = 0, len = this.network.edges.length; i < len; i++)
      this.drawLine(this.network.edges[i])
      
    this.drawPath()
  }

  render() {

    return <div className='right-panel'>

              <div className='canvas-container'></div>

          </div>
  }
}