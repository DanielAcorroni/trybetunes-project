import React from 'react';
import loadingGif from '../assets/images/loading.gif';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <img src={ loadingGif } alt="Loading animation" />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
