import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CollectionRoute = ({ component }) => {
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('auth_token')
        if (token) {
            navigate("/collections");
        }
    }, []);

    return <div>{component}</div>;
};

export default CollectionRoute;


