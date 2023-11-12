import logo from "./../../../assets/logo.png";
import IconShopping from "../IconShopping";
import video from '../../../assets/AMERICUS & GOSANI PRE-FALL19 AD CAMPAIGN.mp4';
import { FaUserLarge, FaCircleXmark } from "react-icons/fa6";
import './styled.scss';
import { Link } from 'react-router-dom';


const Header = (props) => {

    let popup = document.getElementById('popup');
    const popupAction = () => {
        popup.classList.add("open-popup");

    }
    const closePopup = () => {
        popup.classList.remove("open-popup");
    }

    return (
        <>
            <div className="header-container">
                <video autoPlay={false} loop muted playsInline className="header-video">
                    <source
                        src={video}
                        type="video/mp4" />
                </video>
                <nav>
                    <img src={logo} alt={logo} />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/collections">Collections</Link></li>
                        <li><Link to="">Contact</Link></li>
                        <li><Link to="">About</Link></li>
                    </ul>
                    <div className="header-user">
                        <IconShopping />
                        <FaUserLarge className="user" type="submit" onClick={() => { popupAction() }} />
                        <div id="popup" className="popup" >
                            <button onClick={() => { props.onLogin() }} >Login</button>
                            <button onClick={() => { props.onRegister() }}>Register</button>
                            <FaCircleXmark className="btn-close" onClick={() => { closePopup() }} />
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;