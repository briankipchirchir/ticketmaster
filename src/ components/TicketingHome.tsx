
import "./TicketingHome.css";
import decadeImage from "../assets/Decade.jpeg";
import williImage from "../assets/BTS.jpeg";  // correct relative path from components folder
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import kualarImage from "../assets/kualar.jpeg"


const btsTourStops = [
  { city: "Tampa", country: "USA", date: "Apr 25–26, 2026" },
  { city: "El Paso", country: "USA", date: "May 7–8, 2026" },
  { city: "Mexico City", country: "Mexico", date: "May 15–17, 2026" },
  { city: "Stanford", country: "USA", date: "May 21–23, 2026" },
  { city: "Las Vegas", country: "USA", date: "Jun 13–14, 2026" },
  { city: "London", country: "UK", date: "Jul 6–7, 2026" },
  { city: "Munich", country: "Germany", date: "Jul 6–7, 2026" },
  { city: "Paris", country: "France", date: "Jul 18–19, 2026" },
  { city: "Goyang", country: "South Korea", date: "Apr 9–12, 2026" },

  { city: "Tokyo", country: "Japan", date: "Apr 17–18, 2026" },
  { city: "Osaka", country: "Japan", date: "May 1–2, 2026" },
  { city: "Nagoya", country: "Japan", date: "Jun 20–21, 2026" },
  { city: "Fukuoka", country: "Japan", date: "Jul 1–2, 2026" },

  { city: "Busan", country: "South Korea", date: "Jun 20–21, 2026" },

  { city: "Madrid", country: "Spain", date: "Jun 24–25, 2026" },
  { city: "Brussels", country: "Belgium", date: "Jul 1–2, 2026" },
  
 

  { city: "East Rutherford", country: "USA", date: "Jul 25–27, 2026" },
  { city: "Foxborough", country: "USA", date: "Aug 1–2, 2026" },
  { city: "Washington DC", country: "USA", date: "Aug 8–9, 2026" },
  { city: "Baltimore", country: "USA", date: "Aug 15–16, 2026" },
  { city: "Toronto", country: "Canada", date: "Aug 21–22, 2026" },
  { city: "Chicago", country: "USA", date: "Aug 27–28, 2026" },

  { city: "Los Angeles", country: "USA", date: "Sep 1–6, 2026" },
  { city: "Bogotá", country: "Colombia", date: "Sep 9–10, 2026" },
  { city: "Lima", country: "Peru", date: "Oct 14–15, 2026" },
  { city: "Santiago", country: "Chile", date: "Oct 23–24, 2026" },
  { city: "Buenos Aires", country: "Argentina", date: "Nov 9–10, 2026" },
  { city: "São Paulo", country: "Brazil", date: "Nov 21–22, 2026" },

  { city: "Kaohsiung", country: "Taiwan", date: "Dec 17–18, 2026" },
  { city: "Bangkok", country: "Thailand", date: "Dec 23–24, 2026" },
  { city: "Kuala Lumpur", country: "Malaysia", date: "Jan 16–17, 2027" },

  { city: "Singapore", country: "Singapore", date: "Feb 12–13, 2027" },
  { city: "Jakarta", country: "Indonesia", date: "Feb 18–20, 2027" },
  { city: "Melbourne", country: "Australia", date: "Feb 12–13, 2027" },
  { city: "Sydney", country: "Australia", date: "Feb 26–27, 2027" },
  { city: "Hong Kong", country: "Hong Kong", date: "Mar 13–14, 2027" },
  { city: "Manila", country: "Philippines", date: "Mar 13–14, 2027" },
];


const TicketingHome: React.FC = () => {
     const navigate = useNavigate();
     const [showBTSModal, setShowBTSModal] = useState(false);
const [selectedStop, setSelectedStop] = useState<any>(null);

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
       <div className="country">
  <img 
    src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
    alt="US Flag" 
    height={16} 
    style={{ marginRight: "6px", verticalAlign: "middle" }}
  />
  US
</div>

        <div className="top-links">
          <span>Hotels</span>
          <span>Sell</span>
          <span>Gift Cards</span>
          <span>Help</span>
          <span>VIP</span>
          <span className="paypal-con">
  {/* PayPal */}
  <img
    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
    alt="PayPal"
    height={20}
    style={{ marginRight: "6px", verticalAlign: "middle" }}
  />
  PayPal
</span>

        </div>
      </div>

      {/* Header */}
      <header className="header">
        <nav className="nav">
          <h1 className="logo">Ticketmaster Official Tickets Resales</h1>
          <a>Concerts</a>
          <a>Sports</a>
          <a>Arts & Theatre</a>
          <a>Family</a>
          <a>Cities</a>
          <div
  className="nav-right"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/admin-login")}
>
  Sign In / Register
</div>

        </nav>

        <div className="search-bar">
          <input placeholder="Artist, Event or Venue" />
          <button>Search</button>
        </div>
      </header>

    {/* First Event Section */}
<section className="hero-first-event">
  <div className="hero-first-content">
    {/* Event Image */}
    <img 
      src={williImage} // import at top
      alt="BTS world tour"
      className="event-image"
    />

    {/* Event Text */}
    <div className="event-text">
      <span className="badge">Happening Soon</span>
      <h2>BTS world tour Concerts</h2>
      <p>Concert · Live · </p>
     <button onClick={() => setShowBTSModal(true)}>
  Get Tickets
</button>

    </div>
  </div>
</section>

{/* Second Event Section (Hero Background) */}
<section
  className="hero-second-event"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${decadeImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="hero-content">
    <h2>Featured Event</h2>
    <h2>The Decade 10th Anniversary Singapore</h2>
    <p>Theatre · Live · Touring</p>
    <button onClick={() => navigate("/tickets/seventeen")}>
      Find Tickets
    </button>
  </div>
</section>


{/* Second Event Section (Hero Background) */}
<section
  className="hero-second-event"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${kualarImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="hero-content">
    <h2>Featured Event</h2>
    <h2>CHEN CONCERT TOUR  in KUALA LUMPUR</h2>
    <p>Theatre · Live · Touring</p>
    <button onClick={() => navigate("/tickets/kualar")}>
      Find Tickets
    </button>
  </div>
</section>


{showBTSModal && (
  <div className="modal-overlay">
    <div className="modal">
      {/* Header */}
      <div className="modal-header">
        <h2>BTS World Tour</h2>
        <span className="close" onClick={() => setShowBTSModal(false)}>
          ✕
        </span>
      </div>
<div className="modal-content">
  {btsTourStops.map((stop) => (
    <div
      key={`${stop.city}-${stop.date}`}
      className={`location-row ${
        selectedStop?.city === stop.city ? "active" : ""
      }`}
      onClick={() => setSelectedStop(stop)}
    >
      <div className="location-left">
        <span className="city">{stop.city}</span>
        <span className="country">{stop.country}</span>
      </div>

      <div className="location-right">
        <span className="date">{stop.date}</span>
        <span className="chevron">›</span>
      </div>
    </div>
  ))}
</div>



      {/* Footer */}
      <div className="modal-footer">
       <button
  disabled={!selectedStop}
  onClick={() =>
    navigate("/tickets/willi", {
      state: { selectedStop }
    })
  }
>
  Continue
</button>

      </div>
    </div>
  </div>
)}



     {/* Cards Section */}
<section className="cards">
  <div
    className="card"
    style={{
      backgroundImage: `url("https://prismic-images.tmol.io/ticketmaster-tm-global/aNwo_Z5xUNkB1Tgy_EADP-Desktop-Header-twicev2.png?auto=format,compress&rect=65,0,2297,969&w=1024&h=432")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      color: "white",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20px",
        fontWeight: "bold",
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
      }}
    >
      Featured Shows
    </span>
  </div>

  <div
    className="card"
    style={{
      backgroundImage: `url("https://prismic-images.tmol.io/ticketmaster-tm-global/ZtsmlxoQrfVKlzKh_EventsImageDesktop-1024x432-TicketMaster.jpg?auto=format,compress&rect=0,0,1024,432&w=1024&h=432")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      color: "white",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20px",
        fontWeight: "bold",
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
      }}
    >
      Sports Events
    </span>
  </div>

  <div
    className="card"
    style={{
      backgroundImage: `url("https://prismic-images.tmol.io/ticketmaster-tm-global/8c1d105c-df15-448c-8ecb-74b210493e99_EADP-Desktop-Header-disney.jpg?auto=compress,format&rect=69,0,2297,969&w=1024&h=432")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      color: "white",
    }}
  >
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20px",
        fontWeight: "bold",
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
      }}
    >
      Family Events
    </span>
  </div>
</section>


      {/* Featured Events Section */}
      <section className="featured-events">
        <div className="featured-left">
          <div className="event theatre">
            <img
              src="https://prismic-images.tmol.io/ticketmaster-tm-global/787476a3-e977-47ff-86e8-5453931a54e8_EADP-Desktop-Header-LK+v1.jpg?auto=compress,format&rect=0,0,2425,1023&w=1024&h=432"
              alt="The Lion King"
            />
            <p>Disney Presents The Lion King (Touring)</p>
          </div>
          <div className="event comedy">
            <img
              src="https://s1.ticketm.net/dam/a/676/f9528726-9c07-4c43-b46e-f0b25ebcc676_RETINA_PORTRAIT_3_2.jpg"
              alt="Jeff Dunham"
            />
            <p>Jeff Dunham</p>
          </div>
          <div className="event comedy">
            <img
              src="https://prismic-images.tmol.io/ticketmaster-tm-global/aKiCjKTt2nPbapHC_harlemglobetrottersdesktopheader.png?auto=format%2Ccompress&rect=65%2C0%2C2297%2C969&w=1024&h=432"
              alt="Jeff Dunham"
            />
            <p>Harlet Globetrotters tickets</p>
          </div>
          <div className="event comedy">
            <img
              src="https://prismic-images.tmol.io/ticketmaster-tm-global/aQy0nrpReVYa4Ifu_EADP-Desktop-Header-journey.png?auto=format%2Ccompress&rect=1%2C0%2C2425%2C1023&w=2048&h=864"
              alt="Jeff Dunham"
            />
            <p>Journey</p>
          </div>
        </div>
        <div className="featured-right">
          <div className="ad">Advertisement</div>
          <div className="featured-box purple">
            <h4>TRAVEL</h4>
            <p>Combine your ticket with a hotel & save up to 57%</p>
          </div>
          <div className="featured-box blue">
            <h4>Ticket Deals</h4>
          </div>
          <div className="featured-box vip">
            <p>Feel the performance, live the moment as a VIP</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketingHome;
