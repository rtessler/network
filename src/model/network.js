
import { find_path } from 'dijkstrajs'

export default class Network {

  constructor(numberOfPoints, maxLinksPerPoint) {

    this.numberOfPoints = numberOfPoints
    this.maxLinksPerPoint = maxLinksPerPoint
    this.width = 0   // width of canvas
    this.height = 0 // height of canvas
    
    this.points = []
    this.edges = []    
    this.path = []

    this.mostDistantPairOfPoints = []
  }

  distance(a,b) {

    // distance between 2 points

    return Math.sqrt( Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2) )
  }

  generatePoints() {

    this.points = []

    const margin = 5

    for (let i = 0; i < this.numberOfPoints; i++) {

      let x = margin + (this.width - 2*margin)  * Math.random() 
      let y = margin + (this.height - 2*margin) * Math.random()

      let pt = {x,y} 

      this.points.push(pt)  
    }
  }

  findClosestNPoints(index, n) {

    if (index < 0 || index >= this.points.length)
      return []

    if (this.points.length < n)
      return []

    let closest = []
    let pt = this.points[index]

    for (let i = 0; i < n; i++) {

      let k = -1    // index of closest point
      let c = Number.MAX_VALUE

      for (let j = 0; j < this.points.length; j++) {

        // closest point cant be itself
        // cant be a point that is already in closest

        if (j !== index && !closest.includes(j)) {

          let d = this.distance(this.points[j], pt)

          if (d < c) {
            k = j
            c = d
          }
        }
      }
        
      closest.push(k)
    }
    
    return closest
  }

  findEdge(a, b) {

    for (let i = 0; i < this.edges.length; i++) {

        let e = this.edges[i]

        if ( 
            (e[0] === a && e[1] === b) || 
            (e[0] === a && e[1] === b)
        )
          return true
    }

    return false
  }

  generateEdges() {

    this.edges = []

    for (let i = 0; i < this.points.length; i++) {

      // every point is connected to at least 1 other point

      let n = 1 + Math.random() * this.maxLinksPerPoint      
      n = Math.floor(n)

      const closest = this.findClosestNPoints(i, n)

      for (let j = 0; j < n; j++) {

        if (closest[j] !== -1 && !this.findEdge(i,closest[j]))
          this.edges.push([i, closest[j]])
      }
    }

    console.log('Network.generateEdges: done')
  }

  findMostDistantPairOfPoints() {

    this.mostDistantPairOfPoints[0] = 0
    this.mostDistantPairOfPoints[1] = 0
    let c = 0

    for (let i = 0; i < this.points.length; i++) {

      let pt = this.points[i]

      for (let j = 0; j < this.points.length; j++) {

        let d = this.distance(pt, this.points[j])
        
        if (d > c) {
          this.mostDistantPairOfPoints[0] = i
          this.mostDistantPairOfPoints[1] = j
          c = d
        }
      }
    }

    console.log('mostDistantPairOfPoints: ', this.mostDistantPairOfPoints)
  }

  dijkstra() {

    //   var graph = {
    //     a: {b: 10, d: 1},
    //     b: {a: 1, c: 1, e: 1},
    //     c: {b: 1, f: 1},
    //     d: {a: 1, e: 1, g: 1},
    //     e: {b: 1, d: 1, f: 1, h: 1},
    //     f: {c: 1, e: 1, i: 1},
    //     g: {d: 1, h: 1},
    //     h: {e: 1, g: 1, i: 1},
    //     i: {f: 1, h: 1}
    // };
    // var path = find_path(graph, 'a', 'i');

    let graph = {}
    this.path = []

    this.points.forEach((pt,i) => {

        graph[i] = {}
    })

    this.edges.forEach(x => {

      graph[x[0]][x[1]] = this.distance(this.points[x[0]], this.points[x[1]])
      graph[x[1]][x[0]] = this.distance(this.points[x[1]], this.points[x[0]])
    })

    try {
      this.path = find_path(graph, this.mostDistantPairOfPoints[0], this.mostDistantPairOfPoints[1]);
    }
    catch (error) {
      console.log(error)

    }

    console.log(this.path)
  }


  generate() {

    this.generatePoints()
    this.generateEdges()
    this.findMostDistantPairOfPoints()
    this.dijkstra()
  }
}
