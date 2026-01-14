

// ================= Footer Component =================
// Create this as: src/components/Footer/Footer.tsx

import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col brand">
          <h2 className="brand-logo">ticketmaster</h2>
          <p className="footer-title">Let's connect</p>
          <div className="socials">
            <span>f</span>
            <span>X</span>
            <span>Blog</span>
            <span>▶</span>
            <span>◎</span>
          </div>

          <p className="footer-title">Download Our Apps</p>
          <div className="app-buttons">
            <button>App Store</button>
            <button>Google Play</button>
          </div>

          <p className="terms">
            By continuing past this page, you agree to our <u>terms of use</u>
          </p>
        </div>

        <div className="footer-col">
          <h4>Helpful Links</h4>
          <ul>
            <li>Help/FAQ</li>
            <li>Sell</li>
            <li>My Account</li>
            <li>Contact Us</li>
            <li>Gift Cards</li>
            <li>Do Not Sell or Share My Personal Information</li>
            <li>Get Started on Ticketmaster</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Network</h4>
          <ul>
            <li>Live Nation</li>
            <li>House of Blues</li>
            <li>Front Gate Tickets</li>
            <li>TicketWeb</li>
            <li>Universe</li>
            <li>NFL</li>
            <li>NBA</li>
            <li>NHL</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>About Us</h4>
          <ul>
            <li>Ticketmaster Blog</li>
            <li>Ticketing Truths</li>
            <li>Ad Choices</li>
            <li>Careers</li>
            <li>Ticket Your Event</li>
            <li>Innovation</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Friends & Partners</h4>
          <ul>
            <li>PayPal</li>
            <li>Allianz</li>
            <li>AWS</li>
            <li>Affiliates</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="policies">
          Our Policies | Privacy Policy | Cookie Policy | Manage my cookies and ad choices
        </div>
        <div className="copyright">
          © 1999–2026 Ticketmaster. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

