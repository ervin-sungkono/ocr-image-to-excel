"use client"
import ListData from "@/components/ListData"
import { useState } from "react"

export default function Home() {
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const form = document.getElementById('test-form')
    const formData = new FormData(form)

    setUploading(true)
    
    await fetch('/api/ocr-table', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log("result", data))
    .catch(err => console.log(err))
    .finally(() => setUploading(false))

  }

  return (
    <main className="container py-8 px-6 flex flex-col min-h-screen items-center justify-center gap-4">
      <div className="flex flex-col w-full max-w-lg items-end gap-4">
        <div className="w-full p-6 shadow-md rounded-md border border-black/30">
          <h1 className="text-xl font-bold mb-4">Convert PDF/Image to Excel Document</h1>
          <form id="test-form" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input type="file" name="file" accept="application/pdf,image/png,image/jpg,image/jpeg" formEncType="multipart/form-data" required onChange={(e) => console.log(e.target.files[0])}/>
            <button className="w-full bg-gray-800 text-white font-semibold px-6 py-3 rounded-md disabled:bg-gray-500 hover:bg-gray-700 transition-colors" disabled={uploading}>
              Submit File
              </button>
          </form>
          {uploading && <p className="mt-4">Uploading...</p>}
        </div>
      </div>
      <ListData/>
    </main>
  )
}
