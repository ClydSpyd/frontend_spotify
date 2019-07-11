import React from 'react';
import Artist from './Artist';

class Grid extends React.Component {

  render(){
    const artistsToShow = [];
    this.props.topResults.forEach(result => {
      artistsToShow.push(result)
    })
    return (
      <div className='gridOutter' className='gridOutter'>
        <div className='gridWrapper'>
          {artistsToShow.map(result =>{
            return (
              <Artist deetz={result} />
            )
          })}
        </div>
      </div>
    )
  }

}

export default Grid;