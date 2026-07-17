"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  async function handleClick() {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/reproduce-error", {
        method: "POST",
        body: formData,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleClick}>Reproduce error</button>
    </div>
  );
}
