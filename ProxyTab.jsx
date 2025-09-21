import React, { useState } from 'react';

export default function ProxyTab() {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  const handleGo = () => {
    setIframeUrl('/proxy?url=' + encodeURIComponent(url));
  };

  return (
    <div>
      <input 
        type="text" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="Enter URL to browse"
      />
      <button onClick={handleGo}>Go</button>
      {iframeUrl && <iframe src={iframeUrl} title="Proxy Tab" style={{width: "100%", height: "80vh"}}/>}
    </div>
  );
}
