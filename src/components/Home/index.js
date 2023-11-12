import React, { useEffect, useState } from "react";
import ContentFirst from "../Welcome/ContentFirst/contentFirst";
// import VideoPublic from "../Welcome/VideoFashion/videoPublic";
import FeatureProduct from "../Welcome/FeatureProduct";
import NewArrival from "../Welcome/NewArrival/newArrival";
import Footer from "../Welcome/Footer/footer";
import axios from "axios";
import HeaderClient from "../HeaderClient";
import './styled.scss';

const Home = () => {

    const [newArrival, setNewArrival] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/client/v1/list_products`).then((res) => {
            setNewArrival(res.data.data);
        })
        axios.get(`api/client/v1/categorie_list`).then((res) => {
            setCategory(res.data.data)
        });

    }, [])

    return (
        <div className="content-wrapper">
            <HeaderClient className='header-client' />

            <ContentFirst />
            {/* <ImageBackground /> */}
            <FeatureProduct category={category} />

            <NewArrival
                newArrival={newArrival}
            />

            {/* <VideoPublic /> */}
            <Footer />
        </div>
    )
}
export default Home;