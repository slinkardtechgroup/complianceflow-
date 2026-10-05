"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function UploadPage() {
  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName =
      `${Date.now()}-${file.name}`;

    const { data, error } =
      await supabase.storage
        .from("documents")
        .upload(fileName, file);

    if (error) {
      alert(error.message);
    } else {
      alert("Upload successful");
      console.log(data);
    }

    setUploading(false);
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Document Upload</h1>

      <input
        type="file"
        onChange={handleUpload}
      />

      {uploading && (
        <p>Uploading...</p>
      )}
    </main>
  );
}