import React from 'react';
import './App.css';
import Spotify from '../node_modules/spotify-web-api-js';
import Grid from './Grid';
import TableRow from './Table';
import Logo from './spotifyLogo.png';
import Background from './defaultBG.png'

const spotifyWebApi = new Spotify();



class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
    console.log(params)
    console.log(params.access_token)
    this.state = {
      topResults: [],
      topSongs: [],
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

  componentDidMount(){
    this.getNowPlaying()
    this.getMyTopArtists()
    this.getMyTopTracks()
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
      if(response){
      console.log(response)
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          image: response.item.album.images[0].url
        }
      })}
    })
 }

 getMyTopArtists() {
   const resultObjects = [];
   spotifyWebApi.getMyTopArtists()
    .then((response) => {
      console.log(response)
      response.items.forEach(result =>{
        let item = {
          artist: result.name,
          artistLink: result.uri,
          image: result.images[1].url
        }
        resultObjects.push(item)
      })
      this.setState({
        topResults: resultObjects
      })
      console.log(this.state)
    })
 }
 getMyTopTracks() {
   const trackObjects = [];
   spotifyWebApi.getMyTopTracks()
    .then((response) => {
      console.log(response)
      response.items.forEach(result =>{

        var albumString = result.album.name.length <= 35 ? result.album.name : `${result.album.name.substring(0, 35)}...`
      
        let item = {
          artist: result.artists[0].name,
          artistLink: result.artists[0].uri,
          song: result.name,
          songLink: result.uri,
          album: albumString,
          albumLink: result.album.uri,
        }
        trackObjects.push(item)
      })
      this.setState({
        topSongs: trackObjects
      })
      console.log(this.state)
    })
 }

// scrollLeft = () => {
//   document.querySelector('.gridOutter').scrollLeft -= 225;
// }

scrollLeft = () => {
  var scrollAmount = document.querySelector('.gridOutter').offsetWidth
  document.querySelector('.gridOutter').scrollBy({ 
    top: 0, 
    left: -scrollAmount, 
    behavior: 'smooth' 
  });
}
scrollRight = () => {
  var scrollAmount = document.querySelector('.gridOutter').offsetWidth
  document.querySelector('.gridOutter').scrollBy({ 
    top: 0, 
    left: scrollAmount, 
    behavior: 'smooth' 
  });
}
// scrollRight = () => {
//   document.querySelector('.gridOutter').scrollLeft += 225;
// }
 

render() {

  return (
    
    <div className="App">
      {this.state.token ? null : 
      <React.Fragment>
      	<div className="landingLogo">
          {/* <img id='defaultBG' src={Background} alt=""/> */}
          <img id='spotifyLogo' src={Logo} alt=""/>
          <span class='topTracksText'><p id='top'>
            Top
          </p> Tunes</span>
          <p class='connectText'>Connect to Spotify and discover your top tracks and artists</p>
            <a href="https://spotifybackend101.herokuapp.com/login/"><span id='login' >Connect to app</span></a>
        </div>
      </React.Fragment>}
      {/* {this.state.token ? null : <a href="http://localhost:8888/"><span id='login' >Connect to app</span></a>} */}

      {this.state.token ? 
      <React.Fragment>
      <div className='sectionOneHeader'>
        <span>Your Top Artists</span>
        <span>
          <a href="#"><i onMouseDown={this.scrollLeft} class="fas fa-chevron-left"></i></a>
          <a href="#"><i onMouseDown={this.scrollRight} class="fas fa-chevron-right"></i></a>
        </span>
      </div>
      
      <Grid topResults={this.state.topResults} />
      <div id='topSongs' className='sectionTwoHeader'><span>Your Top Songs</span></div>


      <table className='tableWrapper'>
        <tr id='tHead'>
          <th id='playRow'></th>
          <th>TITLE</th>
          <th>ARTIST</th>
          <th>ALBUM</th>
        </tr>
        {this.state.topSongs.map(song => {
          // console.log(song)
          return (
            <TableRow details={song} />
          )
        })}
      </table>
      </React.Fragment>
      : null}
    </div>
  )
}
}
export default App;
