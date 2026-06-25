import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Community from "./pages/Community"
import About from "./pages/About"
import "./index.css"
import ScrollToTop from "./components/common/ScrollToTop"

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/community" element={<Community />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </>
  )
}

export default App