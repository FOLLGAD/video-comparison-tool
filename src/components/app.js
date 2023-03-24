import { h, Component } from 'preact';
import VideoComparison from './video-comparison';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <h1>Video Comparison Tool</h1>
        <VideoComparison />
      </div>
    );
  }
}

