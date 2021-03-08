import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY="AIzaSyBqb9nE9L5YeWM49NV1a27agfBg0_LjuDw";
class App extends React.Component{
  state={videos:[],selectedVideo:null};

  componentDidMount() {
    this.onTermSubmit('buildings');
  };

  onTermSubmit = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        type: 'video',
        key: KEY
      }
    });
     this.setState({
       videos:response.data.items,
     selectedVideo:response.data.items[0]});
  };
  onVideoSelect=(video)=>{
   this.setState({selectedVideo:video});
  };

  render() {
    return (
    <div >
        <SearchBar onTermSubmit={this.onTermSubmit}/>
    <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide coloumn">
            <VideoDetail video={this.state.selectedVideo}/>
          </div>
         <div className="five wide column">
          <VideoList
           onVideoSelect={this.onVideoSelect}
           videos={this.state.videos}/>
         </div>
      </div>
     </div>
     </div>
    );
  }
}
export default App;
