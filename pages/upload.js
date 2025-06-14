// pages/upload.js
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload"); // use your preset name

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqocknci4/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setUrl(data.secure_url);
    alert("Upload successful!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upload File to Cloudinary</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && (
        <p>
          File uploaded: <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </p>
      )}
    </div>
  );
}
