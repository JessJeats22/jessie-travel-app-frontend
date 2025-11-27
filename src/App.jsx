
import './App.css'
import { Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar';



// * Page components
import HomePage from './components/HomePage/Home'
import SignInPage from './components/SignInPage/SignIn'
import SignupPage from './components/SignUpPage/SignUp'
import CountryIndex from './components/CountryIndex/CountryIndex'
import CountryDetails from './components/CountryDetails/CountryDetails'
import TravelPostCreate from './components/TravelPostCreate/TravelPostCreate';
import TravelPostDetails from './components/TravelPostDetails/TravelPostDetails';


const App = () => {

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element= {<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element ={<SignupPage />} />
          <Route path="/countries" element ={<CountryIndex />} />
          <Route path="/travelPost/:travelPostId" element={<TravelPostDetails />} />
          <Route path="/countries/:countryId" element ={<CountryDetails />} />
          <Route path="/travelPost/new" element={<TravelPostCreate />} />
          
        </Routes>

      </main>
    </>
  );
};

export default App;

