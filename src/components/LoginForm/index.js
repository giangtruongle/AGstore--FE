import { useNavigate } from "react-router-dom";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import './styled.scss';

const LoginForm = (props) => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [login, setLogin] = useState({
        email: '',
        password: '',
        error_list: []
    })


    useEffect(() => {
        if (!props.open) {
            form.resetFields()
        }
    }, [props.open]);

    const handleLogin = (e) => {
        e.persist();
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const onCancel = () => {
        if (!props.loading) {
            props.setOpen(false)
        }
    };

    const submitLogin = async () => {
        const loginData = {
            email: login.email,
            password: login.password
        }
        await axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', loginData).then((res) => {
                if (res.data.status === 200) {

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_email', res.data.useremail);
                    swal('success', res.data.message, 'success')

                    if (res.data.role === 1) {
                        navigate('/admin/users')
                    } else {
                        navigate('/home');
                    }
                }
                else if (res.data.status === 401) {
                    swal('warning', res.data.message, 'warning')
                } else {
                    setLogin({ ...login, error_list: res.data.validation_errors })
                }
            })
        });
    }

    return (
        <div>
            <Modal open={props.open || props.loading} onOk={submitLogin} onCancel={onCancel} >
                <Form form={form} layout='vertical'>
                    <h2 className="title-login">Login</h2>
                    <Form.Item name='email' label='Email' rules={[{ required: true }, { message: 'email is required' }]}>
                        <Input
                            name='email' value={login.email}
                            onChange={(e) => { handleLogin(e) }} />
                        <span style={{ color: "red" }}>{login.error_list.email}</span>
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={[{ required: true }, { message: 'password is required' }]}>
                        <Input.Password
                            name='password' value={login.password}
                            onChange={(e) => { handleLogin(e) }} />
                        <span style={{ color: "red" }}>{login.error_list.password}</span>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default LoginForm;


