import { useNavigate } from "react-router-dom";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import './styled.scss';

const RegisterForm = (props) => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        errors_list: [],
    })

    useEffect(() => {
        if (!props.open) {
            form.resetFields()
        }
    }, [props.open]);

    const onCancel = () => {
        if (!props.loading) {
            props.setOpen(false)
        }
    };

    const handleChangeData = (e) => {
        e.persist();
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async (e) => {

        const dataRegister = {
            name: registerData.name,
            email: registerData.email,
            password: registerData.password
        }

        await axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', dataRegister).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    navigate("/home");
                    props.setOpen(false);
                    swal('success', res.data.message, 'success')

                } else {
                    setRegisterData({
                        ...registerData,
                        errors_list: res.data.validation_errors
                    });
                }
            })
        }
        )
    };

    return (
        <div>
            <Modal open={props.open || props.loading} confirmloading={props.loading} onOk={handleRegister} onCancel={onCancel} >
                <Form form={form} layout='vertical'>
                    <h2 className="title-register">Register</h2>
                    <Form.Item name='name' label='Your Name' rules={[{ required: true, color: "red" }, { message: "FullName is required" }]}>
                        <Input
                            name='name' value={registerData.name}
                            onChange={(e) => { handleChangeData(e) }} />
                        <span style={{ color: "red" }}>{registerData.errors_list.name}</span>
                    </Form.Item>
                    <Form.Item name='email' label='Email' rules={[{ required: true }, { message: "Email is required" }]}>
                        <Input
                            name='email' value={registerData.email}
                            onChange={(e) => { handleChangeData(e) }} />
                        <span style={{ color: "red" }}>{registerData.errors_list.email}</span>
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={[{ required: true }, { message: "Password is required" }]}>
                        <Input.Password
                            name='password' value={registerData.password}
                            onChange={(e) => { handleChangeData(e) }}
                        />
                        <span style={{ color: "red" }}>{registerData.errors_list.password}</span>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RegisterForm;


