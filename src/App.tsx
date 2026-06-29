import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Feature from "./pages/Feature"
import Cinema from "./pages/Cinema"
import Download from "./pages/Download"
import Support from "./pages/Support"
import About from "./pages/About"
import Community from "./pages/Community"
import Blog from "./pages/Blog"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import ScrollToTop from "./components/common/ScrollToTop"
import "./index.css"

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/download" element={<Download />} />
        <Route path="/support" element={<Support />} />

        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App