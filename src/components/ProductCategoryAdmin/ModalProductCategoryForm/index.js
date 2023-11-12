import React from "react";
import { useEffect } from "react";
import { Form, Modal, Input, Select, Upload, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";


const ModalProductCategoryForm = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!props.open) {
            form.resetFields();
        }
    }, [props.open]);

    useEffect(() => {
        if (props.open && props.formData.id) {
            form.setFieldsValue(props.formData)
        }
    }, [props.open, props.formData]);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        props.setFormData({
            ...props.formData,
            [name]: value
        });
    }

    const onSubmitForm = async () => {
        const values = await form.validateFields();
        if (values.id) {
            let formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', values.name);
            formData.append('slug', values.slug);
            formData.append('status', values.status);
            if (!values.image_url_pc.file) {
                formData.append('image_url_pc', values.image_url_pc)
            } else {
                formData.append('image_url_pc', values.image_url_pc.file.originFileObj);
            }
            // console.log(values.image_url_pc.file.originFileObj)
            axios.post(`http://127.0.0.1:8000/api/v1/product-category/${values.id}`, formData, {
                header: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => { console.log(res) }).catch(err => { console.log(err.response.data) })

            props.onSubmit(props.formData.id)
            toast.success('Update Success!')

        } else {
            let formData = new FormData();
            formData.append('name', values.name);
            formData.append('slug', values.slug);
            formData.append('status', values.status);
            formData.append('image_url_pc', values.image_url_pc.file.originFileObj);

            axios.post(`http://127.0.0.1:8000/api/v1/product-category`, formData, {
                header: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => { console.log(res) }).catch(err => { console.log(err.response.data) })

            props.onSubmit(props.formData)
            toast.success('Create Success!')
        }
    }

    const onCancel = () => {
        if (!props.loading) {
            props.setOpen(false)
            props.setActionButton("CREATE")
        }
    };

    return (
        <Modal open={props.open || props.loading} confirmloading={props.loading} onOk={onSubmitForm} onCancel={onCancel} >
            <Form form={form} layout="vertical">
                <Form.Item name="id">
                    <h2 style={{ color: '#576574' }}>{props.actionButton === 'CREATE' ? 'Create New Product Category' : 'Update Product Category'}</h2>
                    <Input name="id" hidden={true} />
                </Form.Item>
                <Form.Item name="name" label="Product Category Name" rules={[{ required: true, message: 'Please input Name' }]}>
                    <Input name="name" type="text" onChange={onChange} />
                </Form.Item>
                <Form.Item name="slug" label="Slug" rules={[{ required: true, message: 'Please input Email Address' }]}>
                    <Input name="slug" type="text" onChange={onChange} />
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input Password' }]}>
                    <Select name="staus" options={[
                        { value: '1', label: 'Show' },
                        { value: '0', label: 'Hide' },
                    ]} />
                </Form.Item>
                <Form.Item name={'image_url_pc'} className="image_url_pc"
                    label="Product Category Image"
                    rules={[{ required: true, message: 'Please input Image' }]}>
                    <Upload>
                        {props.actionButton === 'UPDATE' ?
                            <img src={`${props.formData.image_url_pc}`} alt="" height={175} width={175} style={{ margin: 20 }} />
                            :
                            <span></span>
                        }
                        <Button style={{ margin: 20 }}>Upload Image</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalProductCategoryForm;
