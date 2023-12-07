// Importing necessary dependencies
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';

import React from 'react';

// Trailer component for displaying a YouTube video player
const Trailer = () => {
  let params = useParams();
  let key = params.ytTrailerId;

  // Rendering the ReactPlayer component with the YouTube video
  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          controls={true}
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
};

export default Trailer;
