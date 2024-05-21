import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';


function Header() {
    const hideSidebar = () => {
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'none'
    };

    const showSidebar = () => {
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'flex'
    };

    

    return (
        <header>
            <nav>
                <ul className="sidebar">
                    <li onClick={hideSidebar}><FontAwesomeIcon icon={faTimes}className="closeIcon" /></li>
                    <li className="logo"><a href="#">" MMUJOB "</a></li>
                    
                    <li><a href="#">Job search</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Company profiles</a></li>
                    <li id="user" className="User"><a href="#">User &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>       
                        <ul className="Dropdown">
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Saved search</a></li>
                            <li><a href="#">Saved Job</a></li>
                            <li><a href="#">Job application</a></li>
                            <li><a href="#">Recommended Job</a></li>
                            <li><a href="#">Setting</a></li>
                            <li style={{ color: 'red' }}><a href="#">Logout</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Employer site</a></li>
                </ul>
                <ul>
                    <li className="logo"><a href="#">" MMUJOB "</a></li>
                    <li className="hideOnMobile"><a href="#">Job search</a></li>
                    <li className="hideOnMobile"><a href="#">Profile</a></li>
                    <li className="hideOnMobile"><a href="#">Company profiles</a></li>
                    <li className="hideOnMobile">
                        <ul>
                            <li id="user" className="User"><a href="#">User &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                                <ul className="Dropdown">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Saved search</a></li>
                                    <li><a href="#">Saved Job</a></li>
                                    <li><a href="#">Job application</a></li>
                                    <li><a href="#">Recommended Job</a></li>
                                    <li><a href="#">Setting</a></li>
                                    <li style={{ color: 'red' }}><a href="#">Logout</a></li>
                                </ul>
                            </li>
                            <li className='site'><a href="#">Employer site</a></li>
                        </ul>
                    </li>
                    <li className="menu-button" onClick={showSidebar}> <FontAwesomeIcon icon={faBars} className="menuIcon"/> </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
