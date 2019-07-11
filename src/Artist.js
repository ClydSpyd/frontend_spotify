import React from 'react';

class Artist extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mouseIsInside: false
    }
  }
  mouseEnter = () => {
    this.setState({ mouseIsInside: true });
  }
  mouseLeave = () => {
    this.setState({ mouseIsInside: false });
  }

  render(){
    return (
      <div className='bookWrapper'>
        {this.state.mouseIsInside ? 
        
        <div id='play' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}> 
        <a href={this.props.deetz.artistLink}><i class="far fa-play-circle"></i></a>
        </div> 
        
        : null}
        <img src={this.props.deetz.image} alt={this.props.deetz.artist} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}/>
        <a href={this.props.deetz.artistLink}><h5>{this.props.deetz.artist}</h5></a>
      </div>
    )
  }
}

export default Artist;