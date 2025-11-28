import './Home.css'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router'

const Home = () => {

  const { user } = useContext(UserContext)
  console.log('User:', user)

  return (
    <div className="home-container">

      {!user && (
        <section className="home-hero">
          <h1 className="home-title">🌍 Welcome to Worldly</h1>
          <p className="home-tagline">
            Your personal space for sharing adventures, discovering new places,  
            and being inspired by travellers from all around the world.
          </p>

          <div className="home-info-block">
            <p>
              ✈️ Browse countries and explore travel stories from other adventurers.
            </p>
            <p>
              📸 Create your own travel posts to document your journeys.
            </p>
            <p>
              🌟 Save inspiration for your next big trip!
            </p>
          </div>

          <Link to="/sign-up" className="home-signup-btn">
            Create an Account
          </Link>
        </section>
      )}

      {/* SIGNED IN */}
      {user && (
        <section className="home-welcome">
          <h1 className="home-title">🌎 Welcome back, {user.username}!</h1>

          <p className="welcome-message">
            Ready for your next adventure?  
            Jump back into exploring countries or share your latest trip!
          </p>

          <div className="home-actions">
            <Link to="/countries" className="home-action-btn">
              Explore Countries
            </Link>
            <Link to="/travelPost/new" className="home-action-btn">
              Create a Travel Post
            </Link>
          </div>
        </section>
      )}

    </div>
  )
}

export default Home
