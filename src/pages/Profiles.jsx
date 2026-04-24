import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import './Profiles.css'

const profiles = [
  { id: 'p1', name: 'Nitya', color: '#E50914' },
  { id: 'p2', name: 'Kids', color: '#2BB0ED' },
  { id: 'p3', name: 'Guest', color: '#8C8C8C' },
  { id: 'p4', name: 'Work', color: '#F5A623' },
]

export default function Profiles() {
  return (
    <div className="profiles">
      <Navbar />
      <main className="profiles__main">
        <div className="profiles__center">
          <h1 className="profiles__title">Who&apos;s watching?</h1>

          <div className="profilesGrid" role="list">
            {profiles.map((p) => (
              <Link key={p.id} to="/" className="profile" role="listitem" aria-label={p.name}>
                <div className="profile__avatar" style={{ background: p.color }} aria-hidden="true">
                  <div className="profile__shine" aria-hidden="true" />
                </div>
                <div className="profile__name">{p.name}</div>
              </Link>
            ))}
          </div>

          <button type="button" className="profiles__manageBtn">
            Manage Profiles
          </button>
        </div>
      </main>
    </div>
  )
}

