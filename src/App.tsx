
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketingHome from "./ components/TicketingHome";
import { Footer } from "./ components/Footer";
import TicketsPage from "./ components/TicketsPage";
import AdminPage from "./ components/AdminPage";
import AdminLogin from "./ components/AdminLogin";

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

          <Route
          path="/admin"
          element={
            <>
              <AdminPage />
              <Footer />
            </>
          }
        />
        
         <Route
          path="/admin-login"
          element={
            <>
              <AdminLogin />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
