
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketingHome from "./ components/TicketingHome";
import { Footer } from "./ components/Footer";
import TicketsPage from "./ components/TicketsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TicketingHome />
              <Footer />
            </>
          }
        />
        <Route
          path="/tickets"
          element={
            <>
              <TicketsPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
