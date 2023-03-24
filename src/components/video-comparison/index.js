import "./video-comparison.css";
import { h, Component } from 'preact';

export default class VideoComparison extends Component {
  constructor() {
    super();
    this.state = {
      video1: null,
      video2: null,
      sync: false,
    };
  }

  videoRefs = {
    video1: null,
    video2: null,
  };

  loadVideo = (e, videoIndex) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    this.setState({ [`video${videoIndex}`]: url });
  };

  toggleSync = () => {
    this.setState({ sync: !this.state.sync });
  };

  syncVideos = (videoIndex) => {
    if (!this.state.sync) return;

    const otherVideoIndex = videoIndex === 1 ? 2 : 1;
    const currentVideo = this.videoRefs[`video${videoIndex}`];
    const otherVideo = this.videoRefs[`video${otherVideoIndex}`];

    if (currentVideo.paused) {
      otherVideo.pause();
    } else {
      otherVideo.play();
    }
  };

  setVideoRef = (el, videoIndex) => {
    this.videoRefs[`video${videoIndex}`] = el;
  };

  skipBack = (videoIndex) => {
    for (let i of [1,2])
      this.videoRefs[`video${i}`].currentTime = Math.max(0, this.videoRefs[`video${i}`].currentTime - 5);
  };

  changePlaybackSpeed = (e) => {
    const speed = parseFloat(e.target.value);
    for (let i of [1,2])
      this.videoRefs[`video${i}`].playbackRate = speed;
  };

  render() {
    const { video1, video2, sync } = this.state;
    const playbackSpeedOptions = [0.5, 1, 1.5, 2];

    return (
      <div className="container">
        <p>
          I built this tool using the GPT-4 AI model by OpenAI. I created it because I wanted to analyze my ski jump videos and thought it'd be cool to share it with others who might find it useful too.
          Feel free to check out my <a href="https://github.com/follgad" target="_blank" rel="noopener noreferrer">GitHub</a> for more of my projects.
          </p>
	<div>
	  <input type="file" accept="video/*" onChange={(e) => this.loadVideo(e, 1)} />
	  <input type="file" accept="video/*" onChange={(e) => this.loadVideo(e, 2)} />
	</div>
	<div className="video-container">
	  <video
	    src={video1}
	    ref={(el) => this.setVideoRef(el, 1)}
	    onPlay={() => this.syncVideos(1)}
	    onPause={() => this.syncVideos(1)}
	    controls
	    style={{ width: '45%' }}
	  />
	  <video
	    src={video2}
	    ref={(el) => this.setVideoRef(el, 2)}
	    onPlay={() => this.syncVideos(2)}
	    onPause={() => this.syncVideos(2)}
	    controls
	    style={{ width: '45%' }}
	  />
	</div>
	<div>
	  <label>
	    <input type="checkbox" checked={sync} onChange={this.toggleSync} />
	    Sync videos
	  </label>
	</div>
	<div>
	  <div>
	    <button onClick={() => this.skipBack(1)}>Skip back 5s</button>
	    <select value={1} onChange={(e) => this.changePlaybackSpeed(e)}>
	      {playbackSpeedOptions.map((speed) => (
	        <option value={speed}>{speed}x</option>
	      ))}
	    </select>
	  </div>
	</div>
      </div>
    )
  }
}
