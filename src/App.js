import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { playVideos, pauseVideos, stopVideos } from './actions'
import Video from './components/Video'
import { getAudioPeaks } from './helpers/audio'

class App extends Component {

  constructor(props) {
      super(props)
      this.state = {
        videos: [],
      }
      this.videoRefs = []
    }

    handleFiles = (e) => {
      const URL = window.URL || window.webkitURL
      const videos = [...e.target.files].map(file => {
        const objectURL = URL.createObjectURL(file)
        // getAudioPeaks(file)
        return objectURL
      })
      this.setState({ videos })
    }

    renderVideos = () => {
      return this.state.videos.map((video, index) => {
        // const visibility = index > 0 ? 'hidden' : 'visible'
        const visibility = 'visible'
        const muted = visibility === 'visible'
        return (
            <Video
            key={index} 
            src={video}
            controls
            muted={muted}
            />
        )
      })
    }

    renderMainVideo = () => {
      return this.state.videos.map((video, index) => {
        if(index !== 0)
          return ""
        // const visibility = index > 0 ? 'hidden' : 'visible'
        const visibility = 'visible'
        const muted = visibility === 'visible'
        return (
            <Video
            key={index} 
            src={video}
            controls
            muted={muted}
            />
        )
      })
    }


    render() {
      return (<div className="ui">
        <div className="tools">
          <input onChange={this.handleFiles} multiple type="file" />
          <button onClick={this.props.play}>Play</button>
          <button onClick={this.props.pause}>Pause</button>
          <button onClick={this.props.stop}>Stop</button>
        </div>
        <div className="main-video">
        {this.renderMainVideo()}
        </div>
        <div className="video-container">
          {this.renderVideos()}
        </div>
      </div>)
    }
}

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(playVideos()),
  pause: () => dispatch(pauseVideos()),
  stop: () => dispatch(stopVideos()),
})

const mapStateToProps = (state, _ownProps) => ({
  someState: state.defaultReducer === {} ? 'empty' : 'not empty',
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
