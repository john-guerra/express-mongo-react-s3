import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("/files")
      .then((res) => res.json())
      .then((res) => setFiles(res.files));
  }, []);

  const renderFiles = () => files.map((f) => <img src={f.url} alt={f.url} />);

  return (
    <div className="App">
      <h1>S3 Upload</h1>

      <form action="/upload" method="POST" encType="multipart/form-data">
        <label>
          Select a file
          <input name="file" type="file" />
        </label>

        <br />
        <br />

        <button type="submit">Upload</button>
      </form>

      <h2>Files</h2>
      {renderFiles()}
    </div>
  );
}

export default App;
