import React from "react";
import './styled.scss';

import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";

const SocialIcon = () => {
    return (
        <center className="row wraper-icons" style={{ margin: 20 }} >
            <div className="col-3 social-icon" >
                <FaFacebookF />
            </div>
            <div className="col-3 social-icon">
                <FaInstagram className="instagram" />
            </div >

            <div className="col-3 social-icon">
                <FaTiktok className="tiktok" />
            </div>
            <div className="col-3 social-icon">
                <FaTwitter className="twitter" />
            </div>

        </center>

    );
}
export default SocialIcon;