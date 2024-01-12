import { Link } from 'react-router-dom';
import Catalog from '../components/catalog';
import ApiJoke from '../components/apiJoke';
//import ApiImage from '../components/apiFactAboutCat';
import Header from '../components/header';
import { useLocation } from 'react-router-dom';

import './styles/utils.css';

const Home = ({ loggedInUser, onLogout }) => {
    console.log(loggedInUser, "jaba2");
    const location = useLocation();
    return (
        <div>
            <Header logout={onLogout} />

            <Catalog/>

            <div className='container'>
                {loggedInUser && <Link to="/add-Device" className="add-trip-link">Add Device</Link>}
            </div>

            <ApiJoke />
            {/* <ApiImage /> */}
        </div>
    );
};

export default Home;