import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Login from "./pages/login/Login";
import Home from "./pages/home/home";
import MovieDetails from "./pages/movie-details/MovieDetails";
import BookTickets from "./pages/book-tickets/bookTickets";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/book-tickets/:movieTitle" element={<BookTickets />} />
      </Routes>
    </>
  );
}

export default App;
