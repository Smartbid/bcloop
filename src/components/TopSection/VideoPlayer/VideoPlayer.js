import React, { Component } from 'react'
import ReactPlayer from 'react-player'

 
export default class VideoPlayer extends Component {

  render () {
    return (
      <div className="VideoPlayer">
        <ReactPlayer url={this.props.link} playing={true} controls={true} width='100%' height='100%'/>
      </div>
    )
  }
}