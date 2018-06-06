import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'

import './Video.css'

class Video extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      offset: 0,
    }
  }

  getCurrentTime() {
    return this.state.offset + this.videoRef.currentTime
  }

  onPlay = (e) => {
    this.props.onPlay && this.props.onPlay(e)
  }

  onPause = (e) => {
    this.props.onPause && this.props.onPause(e)
  }

  onTimeUpdate = (e) => {
    this.props.onTimeUpdate && this.props.onTimeUpdate(e)
  }

  setOffset = () => {
    this.setState({
      offset: this.videoRef.currentTime,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.playing && nextProps.playing) {
      this.videoRef.play()
    }
    if (!this.props.paused && nextProps.paused) {
      this.videoRef.pause()
    }
    if ((this.props.playing || this.props.paused) && !nextProps.playing && !nextProps.paused) {
      this.videoRef.pause()
      this.videoRef.currentTime = this.state.offset
    }
  }

  seek = (dir = "right", fast = false) => {
    let seekTime = fast ? 1 : 0.1
    seekTime = dir === "right" ? seekTime : seekTime * -1

    if (this.videoRef.currentTime >= 0 && this.videoRef.currentTime < this.videoRef.duration) {
      this.videoRef.currentTime += seekTime
    }
  }

  renderTools() {
    return(
      <div className="video-tools">
        <button onClick={this.setOffset}>setOffset</button>
        <button onClick={this.seek.bind(this, "left", true)}>{'<<'}</button>
        <button onClick={this.seek.bind(this, "left", false)}>{'<'}</button>
        <button onClick={this.seek.bind(this, "right", false)}>{'>'}</button>
        <button onClick={this.seek.bind(this, "right", true)}>{'>>'}</button>
      </div>
    )
  }

  render() {
    const { src, muted, controls = false, primary = false } = this.props
    const classes = classNames({
      "video": true,
      "main-video": primary,
    })

    return (
      <div className={classes} onClick={this.props.setPrimary}>
        <video
          ref={el => this.videoRef = el}
          src={src}
          muted={muted}
          controls={controls}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onTimeUpdate={this.onTimeUpdate}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, _ownProps) => ({
  playing: state.videoStatus.playing,
  paused: state.videoStatus.paused,
})

export default connect(mapStateToProps)(Video)
