import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AdminRoute = ({ component }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        axios.get(`/api/checkAuthenicated`).then((res) => {
            if (res.status === 200) {
                setAuthenticated(true)
                setLoading(false)
            }
            if (res.data.status === 403) {
                navigate('/home')
                swal('warrning', res.data.message, 'warning')
            }
            setLoading(false)
        })
        return () => {
            setAuthenticated(false)
        }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(error) {
        if (error.response.status === 401) {
            swal('Warning', error.response.data.message, 'Warning');
            navigate('/');
        }
        return Promise.reject(error);
    });

    if (loading) {
        return <h1>Loading...</h1>
    }

    return <div>{component}</div>;
}
export default AdminRoute;