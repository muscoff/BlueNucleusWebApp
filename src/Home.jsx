import { Link } from 'react-router-dom';
import "./App.css"

function NavButton({ location, idx }) {
  return (
    <Link to={`${location}`} className={`NavButtonContainer ${idx}`}>{location}</Link>
  );
}

function Home() {
  return (
    <>
      <h1>Blue Nucleus</h1>
      <div className="NavButtonGrid">
        <NavButton location="/onboarding" idx="one" />
        <NavButton location="/create-account" idx="two" />
        <NavButton location="/dashboard" idx="three" />
        <NavButton location="/tmp" idx="four" />
        <NavButton location="/tmp" idx="five" />
        <NavButton location="/tmp" idx="six" />
      </div>
    </>
  );
}

export default Home;
