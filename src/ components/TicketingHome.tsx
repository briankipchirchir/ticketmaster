import "./TicketingHome.css";
import heroImage from "../assets/singapore.jpeg";
import williImage from "../assets/BTS.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const btsTourStops = [
  { city: "Tampa", country: "USA", date: "Apr 25–26, 2026" },
  { city: "El Paso", country: "USA", date: "May 7–8, 2026" },
  { city: "Mexico City", country: "Mexico", date: "May 15–17, 2026" },
  { city: "London", country: "UK", date: "Jul 10–11, 2026" },
  { city: "Paris", country: "France", date: "Jul 18–19, 2026" },
  { city: "Tokyo", country: "Japan", date: "Apr 17–18, 2026" },
  { city: "Singapore", country: "Singapore", date: "Feb 12–13, 2027" },
];

const TicketingHome: React.FC = () => {
  const navigate = useNavigate();
  const [showBTSModal, setShowBTSModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState<any>(null);

  return (
    <div className="app">
      {/* ================= TOP BAR ================= */}
      <div className="top-bar">
        <div className="country">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="US Flag"
            height={14}
          />
          US
        </div>

        <div className="top-links">
          <span>Hotels</span>
          <span>Help</span>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="header">
        <nav className="nav">
          <h1 className="logo">Ticketmaster</h1>

          <div className="nav-links">
            <a>Concerts</a>
            <a>Sports</a>
            <a>Arts & Theatre</a>
            <a>Family</a>
            <a>Cities</a>
          </div>

          <div
            className="nav-right"
            onClick={() => navigate("/admin-login")}
          >
            Sign In / Register
          </div>
        </nav>

        <div className="search-bar">
          <input placeholder="City or Zip Code" />
          <input placeholder="All Dates" />
          <input placeholder="Artist, Event or Venue" />
          <button>Search</button>
        </div>
      </header>

      {/* ================= BTS EVENT ================= */}
      <section className="hero-first-event">
        <div className="hero-first-content">
          <img src={williImage} alt="BTS" className="event-image" />

          <div className="event-text">
            <span className="badge">Happening Soon</span>
            <h2>BTS World Tour</h2>
            <p>Concert · Live</p>
            <button onClick={() => setShowBTSModal(true)}>
              Get Tickets
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED HERO ================= */}
      <section
        className="hero-second-event"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${heroImage})`,
        }}
      >
        <div className="hero-content">
          <h2>Seventeen World Tour</h2>
          <p>Singapore · Live</p>
          <button onClick={() => navigate("/tickets/seventeen")}>
            Find Tickets
          </button>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {showBTSModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>BTS World Tour</h2>
              <span className="close" onClick={() => setShowBTSModal(false)}>
                ✕
              </span>
            </div>

            <div className="modal-content">
              {btsTourStops.map((stop) => (
                <div
                  key={stop.city}
                  className={`location-row ${
                    selectedStop?.city === stop.city ? "active" : ""
                  }`}
                  onClick={() => setSelectedStop(stop)}
                >
                  <div>
                    <strong>{stop.city}</strong>
                    <div className="country">{stop.country}</div>
                  </div>
                  <span>{stop.date}</span>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                disabled={!selectedStop}
                onClick={() =>
                  navigate("/tickets/willi", { state: { selectedStop } })
                }
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketingHome;
