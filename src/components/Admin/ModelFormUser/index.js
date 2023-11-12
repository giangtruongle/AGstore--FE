import React from 'react';
import { useEffect } from "react";
import { Form, Modal, Input } from "antd";

const ModelFormUser = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!props.open) {
            form.resetFields()
        }
    }, [props.open]);

    useEffect(() => {
        if (props.open && props.formData.id) {
            form.setFieldsValue(props.formData)
        }
    }, [props.open, props.formData])

    const onSubmit = async () => {
        const values = await form.validateFields()
        props.onSubmit(props.formData.id, values)

    };

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        props.setFormData({
            ...props.formData,
            [name]: value
        });
    }

    const onCancel = () => {
        if (!props.loading) {
            props.setOpen(false)
            props.setActionUser("CREATE")
        }
    };

    return (
        <Modal open={props.open || props.loading} confirmloading={props.loading} onOk={onSubmit} onCancel={onCancel} >
            <Form form={form} layout="vertical">
                <h2 style={{ color: '#576574' }}>{props.actionUser === 'CREATE' ? 'Create New User' : 'Update User'}</h2>

                <Form.Item name="name" label="User Name" rules={[{ required: true, message: 'Please input UserName' }]}>
                    <Input name="name" type="text" onChange={onChange} />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input Email ID' }]}>
                    <Input disabled={props.actionUser === "CREATE" ? false : true} name="email" type="email" onChange={onChange} />
                </Form.Item>
                {props.actionUser === "CREATE" &&
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input Password' }]}>
                        <Input name="password" type="password" onChange={onChange} />
                    </Form.Item>
                }
            </Form>
        </Modal>
    )
}
export default ModelFormUser;