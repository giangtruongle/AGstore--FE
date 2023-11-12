import { useNavigate } from 'react-router-dom';
import { Dropdown } from "antd";
import { User, Role, Name } from './styled';
import swal from 'sweetalert';
import axios from 'axios';

const AuthUser = () => {
    const navigate = useNavigate();


    const onLogout = (e) => {
        e.preventDefault();
        axios.post(`api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('success', res.data.message, 'success')
                navigate('/');
            }
        })
    }

    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "0",
                        label: <a onClick={onLogout}>Log out</a>,
                    },
                ],
            }}
        >
            <User>

                <div>
                    <Role>Welcome</Role>
                    <Name>{localStorage.getItem('auth_name')}</Name>
                </div>
            </User>
        </Dropdown >
    );
};

export default AuthUser;


