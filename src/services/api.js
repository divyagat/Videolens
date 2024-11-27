export const login = async (username, password) => {
    // Example of a POST request
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  };
  
  export const fetchVideos = async () => {
    const response = await fetch('/api/videos');
    return response.json();
  };
  
  export const deleteVideo = async (id) => {
    await fetch(`/api/videos/${id}`, { method: 'DELETE' });
  };
  
  export const addVideo = async (video) => {
    await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video),
    });
  };
  