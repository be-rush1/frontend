import { useState } from 'react'
import './App.css'
import FileUploader from './components/FileUploader'
function App() {

  return (
<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 ">
    <FileUploader/>
  </div>
  )
}

export default App
