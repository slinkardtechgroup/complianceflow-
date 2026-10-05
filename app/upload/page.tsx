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

  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } =
    await supabase.storage
      .from("documents")
      .upload(fileName, file);

  if (uploadError) {
    alert(uploadError.message);
    setUploading(false);
    return;
  }

  const { data: publicUrlData } =
    supabase.storage
      .from("documents")
      .getPublicUrl(fileName);

  const publicUrl =
    publicUrlData.publicUrl;

  const { error: dbError } =
    await supabase
      .from("documents")
      .insert({
        vendor_id:
          "53a70363-3bc7-48b7-978c-d3991de43754",
        document_type:
          "Uploaded Document",
        file_url: publicUrl,
        status: "pending_review",
      });

  if (dbError) {
    alert(dbError.message);
  } else {
    alert("Upload and document record created");
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