import React from 'react';
import './App.css';
import Spotify from '../node_modules/spotify-web-api-js';

const spotifyWebApi = new Spotify();



class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    // const token = params.access_token;
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
    console.log(params)
    console.log(params.access_token)
    this.state = {
      topResults: [],
      // topArtists:[],
      // topPics: [],
      loggedIn : params.access_token ? true : false,
      token : params.access_token,
      nowPlaying: {
        name: 'unknown',
        artist: 'unknown',
        image: ''
      }
    }
    this.getNowPlaying=this.getNowPlaying.bind(this)
    this.getMyTopArtists=this.getMyTopArtists.bind(this)
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
 getNowPlaying() {
   spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response)
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          image: response.item.album.images[0].url
        }
      })
    })
 }

//  getMyTopArtists() {
//    const imageArray = [];
//    spotifyWebApi.getMyTopArtists()
//     .then((response) => {
//       console.log(response)
//       response.items.forEach(result =>{
//         imageArray.push(result.images[1])
//       })
//       this.setState({
//         topResults: response.items,
//         topPics: imageArray
//       })
//       console.log(this.state)
//       console.log(imageArray)
//     })
//  }
 getMyTopArtists() {
   const resultObjects = [];
   spotifyWebApi.getMyTopArtists()
    .then((response) => {
      // console.log(response)
      response.items.forEach(result =>{
        let item = {
          artist: result.name,
          image: result.images[1].url
        }
        resultObjects.push(item)
      })
      this.setState({
        topResults: resultObjects
      })
      console.log(this.state)
      // console.log(imageArray)
    })
  
 }

//  setInterval(getNowPlaying, 500)

render() {
  return (
    <div className="App">
      <a href="http://localhost:8888/">Login to Spotify</a>
      <div>Now Playing: {this.state.nowPlaying.name}</div>
      <div><img src={this.state.nowPlaying.image} style = {{width:300}}/></div>
      <div>{this.state.nowPlaying.artist}</div>
      <button onClick={this.getNowPlaying}>update</button>
      <button onClick={this.getMyTopArtists}>top</button>
    </div>
  )
}
}
export default App;
