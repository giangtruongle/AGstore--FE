import Form from 'react-bootstrap/Form';
import AuthUser from "../../layouts/Default/AuthUser";
import './styled.scss';
import IconShopping from "../Welcome/IconShopping";
import logo from "../../assets/logo.png";
import video from '../../assets/AMERICUS & GOSANI PRE-FALL19 AD CAMPAIGN.mp4';
import { Link } from 'react-router-dom';

const HeaderClient = () => {

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
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/collections">Collections</Link></li>
                        <li><Link to="">Contact</Link></li>
                        <li><Link to="">About</Link></li>
                    </ul>
                    <div className="header-user">
                        <IconShopping />
                        <Form className="wraper-user">
                            <AuthUser />
                        </Form>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default HeaderClient;