import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function EmployerHeader() {
    const hideSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    };

    const showSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    };

    const navigate = useNavigate();
    const token = Cookies.get('empToken');

    const handleUserClick = () => {
        if (!token) {
            navigate('/userLogin');
        }
    };
    const handleLogout = () => {
        const token = Cookies.get('empToken');
        if (!token) {
            console.log('No token found, unable to log out.');
            return;
        }
    
        axios.get('http://localhost:8000/api/EmployerLogout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            Cookies.remove('empToken');
            console.log(response.data);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    

    return (
        <header>
            <nav>
                <ul className="sidebar">
                    <li onClick={hideSidebar}><FontAwesomeIcon icon={faTimes} className="closeIcon" /></li>
                    <li className="empLogo"><a href="/listenJob">" MMUJOB "</a></li>
                    <li>
                        <Link to={token ? "/listenJob" : "/employerLogin"}>
                            Listed Job
                        </Link>
                    </li>
                    <li>
                        <Link to={token ? "/addPost" : "/employerLogin"}>
                            Add Job
                        </Link>
                    </li>
                    <li>
                        <Link to={token ? "/editComProfile" : "/employerLogin"}>
                            Company profile
                        </Link>
                    </li>
                    <li id="user" className="User">
                        {token ? 
                            <a href="#" onClick={handleUserClick}>Employer &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                            :
                            <Link to="/employerLogin">Login</Link>
                        }
                        {token && (
                            <ul className="Dropdown">
                                <li>
                                    <Link to={token ? "/editComProfile" : "/employerLogin"}>
                                        Company profile
                                    </Link>
                                </li>
                                <li><Link to={token ? "/employerApplication" : "/employerLogin"}>Job application</Link></li>
                                <li style={{ color: 'red' }}><a href='#' onClick={handleLogout}>Logout</a></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to={"/SearchJob"}>Employer site</Link></li>
                </ul>
                <ul>
                    <li className="empLogo"><a href="/listenJob">" MMUJOB "</a></li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/listenJob" : "/employerLogin"}>
                            Listed Job
                        </Link>
                    </li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/addPost" : "/employerLogin"}>
                            Add JOb
                        </Link>
                    </li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/editComProfile" : "/employerLogin"}>
                            Company profile
                        </Link>
                    </li>
                    <li className="hideOnMobile">
                        <ul>
                            <li id="user" className="User">
                                {
                                    token ? 
                                    <a href="#" onClick={handleUserClick}>Employer &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    :
                                    <Link to="/employerLogin">Login</Link>
                                }
                                {token && (
                                    <ul className="Dropdown">
                                        <li><Link to={token ? "/employerApplication" : "/employerLogin"}>Job application</Link></li>
                                        <li style={{ color: 'red' }}><a href='#' onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                )}
                            </li>
                            <li className='site'><Link to={"/SearchJob"}>Jobseeker site</Link></li>
                        </ul>
                    </li>
                    <li className="menu-button" onClick={showSidebar}><FontAwesomeIcon icon={faBars} className="menuIcon" /></li>
                </ul>
            </nav>
        </header>
    );
}

export default EmployerHeader;
