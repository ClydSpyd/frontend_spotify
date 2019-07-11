import React from 'react';

class TableRow extends React.Component {
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
      <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <td id='playRow'>{this.state.mouseIsInside ? <a href={this.props.details.songLink}><i class="far fa-play-circle"></i> </a>: null}</td>
        <td><a href={this.props.details.songLink}>{this.props.details.song}</a></td>
        <td><a href={this.props.details.artistLink}>{this.props.details.artist}</a></td>
        <td><a href={this.props.details.albumLink}>{this.props.details.album}</a></td>
      </tr>
    )
  }
}

export default TableRow;