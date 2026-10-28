import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/common/ScrollToTop"
import "./index.css"

const Home = lazy(() => import("./pages/Home"))
const Feature = lazy(() => import("./pages/Feature"))
const FeatureCore = lazy(() => import("./pages/FeatureCore"))
const FeatureSolution = lazy(() => import("./pages/FeatureSolution"))
const Cinema = lazy(() => import("./pages/Cinema"))
const Download = lazy(() => import("./pages/Download"))
const Support = lazy(() => import("./pages/Support"))
const About = lazy(() => import("./pages/About"))
const Community = lazy(() => import("./pages/Community"))
const Blog = lazy(() => import("./pages/Blog"))
const Contact = lazy(() => import("./pages/Contact"))
const Privacy = lazy(() => import("./pages/Privacy"))
const Login = lazy(() => import("./pages/Login"))
const Admin = lazy(() => import("./pages/Admin"))

function ProtectedAdminRoute() {
  const token = localStorage.getItem("pentava-admin-token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Admin />
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/feature/core" element={<FeatureCore />} />
          <Route path="/feature/solution" element={<FeatureSolution />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/download" element={<Download />} />
          <Route path="/support" element={<Support />} />

          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App