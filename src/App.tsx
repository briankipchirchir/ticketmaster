
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import TicketingHome from "./components/TicketingHome";
import { Footer } from "./components/Footer";
import TicketsPage from "./components/TicketsPage";
import AdminPage from "./components/AdminPage";
import AdminLogin from "./components/AdminLogin";
import MyTickets from "./components/MyTickets";
import TicketDetails from "./components/TicketDetails";
import Singapore from "./components/Singapore";
import MyTicketOrders from "./components/Myticketorders";


function App() {
  return (
    <Router>
      <ScrollToTop />
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
          path="/tickets/:eventId"
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

        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/ticket-details" element={<TicketDetails />} />
           <Route path="/singapore" element={<Singapore />} />
           <Route path="/my-ticket-orders" element={<MyTicketOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
