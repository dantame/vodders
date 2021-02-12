import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { playVideos, pauseVideos, stopVideos } from './actions'
import Video from './components/Video'

class App extends Component {

  constructor(props) {
      super(props)
      this.state = {
        videos: [],
        primaryIndex: 0,
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
        const isPrimary = index === this.state.primaryIndex
        return (
            <Video
              key={index}
              src={video}
              primary={isPrimary}
              controls={false}
              muted={!isPrimary}
              setPrimary={this.setPrimary.bind(this, index)}
            />
        )
      })
    }

    setPrimary = (primaryIndex) => {
      this.setState({
        primaryIndex,
      })
    }

    render() {
      const videos = this.renderVideos()

      return (<div className="ui">
        <div className="tools">
          <input onChange={this.handleFiles} multiple type="file" />
          <button onClick={this.props.play}>Play</button>
          <button onClick={this.props.pause}>Pause</button>
          <button onClick={this.props.stop}>Stop</button>
        </div>
        <div className="video-container">
          {videos}
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
