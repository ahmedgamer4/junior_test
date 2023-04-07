import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import { Toaster } from "./components/Toaster"
import AddPage from "./pages/addPage"
import MainPage from "./pages/mainPage"

function App() {
  return (
    <div className='min-h-screen w-11/12 sm:w-10/12 mx-auto py-4 font-mono'>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addNew" element={<AddPage />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
