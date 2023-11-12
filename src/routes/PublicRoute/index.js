import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";

const PublicRoute = ({ component }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('auth_token')
        if (token) {
            navigate("/home");
        }
        // if (!token) {
        //     navigate("/");
        //     swal('warning', 'Please Login to Continute !', 'warning')
        // }
        setLoading(false)
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return <div>{component}</div>;
};

export default PublicRoute;


