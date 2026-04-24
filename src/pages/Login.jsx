import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import './Login.css'

export default function Login() {
  return (
    <div className="login">
      <Navbar />

      <main className="login__main">
        <div className="login__bg" aria-hidden="true" />
        <div className="login__scrim" aria-hidden="true" />

        <section className="loginCard" aria-label="Login (UI only)">
          <h1 className="loginCard__title">Sign In</h1>

          <form className="loginCard__form" onSubmit={(e) => e.preventDefault()}>
            <label className="field">
              <span className="sr-only">Email</span>
              <input className="field__input" type="email" placeholder="Email or phone number" />
            </label>

            <label className="field">
              <span className="sr-only">Password</span>
              <input className="field__input" type="password" placeholder="Password" />
            </label>

            <button type="submit" className="loginCard__cta">
              Sign In
            </button>

            <div className="loginCard__row">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="helpLink">
                Need help?
              </a>
            </div>

            <div className="loginCard__hint">
              New to Netflix?{' '}
              <Link to="/profiles" className="hintLink">
                Choose a profile
              </Link>
            </div>

            <p className="loginCard__fine">
              This page is UI-only. No authentication or backend is implemented.
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}

