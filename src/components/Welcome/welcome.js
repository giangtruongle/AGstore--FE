import React, { useEffect } from 'react';
import Header from './Header/header';
// import ImageBackground from './ImageBackGround/imageBackground';
import VideoPublic from './VideoFashion/videoPublic';
import ContentFirst from './ContentFirst/contentFirst';

import FeatureProduct from './FeatureProduct';
import NewArrival from './NewArrival/newArrival';
import Footer from './Footer/footer';
import './styled.scss';
import { useState } from "react";
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import axios from 'axios';

const Welcome = () => {
    const [open, setOpen] = useState(false)
    const [openRegister, setOpenRegister] = useState(false);
    const [newArrival, setNewArrival] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/client/v1/list_products`).then((res) => {
            setNewArrival(res.data.data);
        });
        axios.get(`api/client/v1/categorie_list`).then((res) => {
            setCategory(res.data.data)
        });
    }, [])

    const onlogin = () => {
        setOpen(true)
    }

    const onRegister = () => {
        setOpenRegister(true)
    }
    return (
        <div className="welcome-wrapper">
            <LoginForm
                open={open}
                setOpen={setOpen}
            />

            <RegisterForm
                open={openRegister}
                setOpen={setOpenRegister}

            />
            <Header
                onLogin={onlogin}
                onRegister={onRegister}
            />

            <ContentFirst />

            {/* <ImageBackground /> */}
            <FeatureProduct category={category} />

            {/* <VideoPublic /> */}
            <NewArrival
                newArrival={newArrival}
            />
            <Footer />
        </div>
    )
}
export default Welcome;