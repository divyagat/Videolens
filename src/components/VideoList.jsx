import React, { useState } from 'react';

const VideoList = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: 'Wedding 1', url: 'https://example.com/video1' },
    { id: 2, title: 'Wedding 2', url: 'https://example.com/video2' },
  ]);

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const handleAdd = () => {
    const title = prompt('Enter video title:');
    const url = prompt('Enter video URL:');
    if (title && url) {
      setVideos([...videos, { id: Date.now(), title, url }]);
    }
  };

  return (
    <div>
      <h2>Videos</h2>
      <button onClick={handleAdd}>Add Video</button>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            {video.title} - <a href={video.url} target="_blank" rel="noopener noreferrer">View</a>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
