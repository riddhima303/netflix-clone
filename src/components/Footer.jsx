import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <a href="#" className="footer__link">
            FAQ
          </a>
          <a href="#" className="footer__link">
            Help Center
          </a>
          <a href="#" className="footer__link">
            Terms of Use
          </a>
          <a href="#" className="footer__link">
            Privacy
          </a>
          <a href="#" className="footer__link">
            Cookie Preferences
          </a>
          <a href="#" className="footer__link">
            Corporate Information
          </a>
        </div>

        <div className="footer__note">Netflix UI clone (UI-only). No affiliation.</div>
      </div>
    </footer>
  )
}

