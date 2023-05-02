import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Auth from "./pages/Auth";
import FilmCollection from "./pages/FilmCollection";
import AddFilm from "./pages/AddFilm";
import Navbar from "./components/Navbar";
import FilmReviews from "./pages/FilmReviews";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/add-film" element={<AddFilm />} />
          <Route path="/collection" element={<FilmCollection />} />
          <Route path="/film-reviews/:filmID" element={<FilmReviews />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
