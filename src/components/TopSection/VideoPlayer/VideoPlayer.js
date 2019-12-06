import React, { Component } from 'react'
import ReactPlayer from 'react-player'

 
export default class VideoPlayer extends Component {

  render () {
    return (
      <div className="VideoPlayer">
        <ReactPlayer onStart={this.props.trackVideoPlay} url={this.props.link} playing={false} controls={true} width='100%' height='100%'/>
      </div>
    )
  }
}