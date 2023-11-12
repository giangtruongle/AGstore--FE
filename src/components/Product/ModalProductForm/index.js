import React, { useEffect } from "react";
import { Form, Modal, Input, Select, Upload, Button } from "antd";
import axios from "axios";
import { toast } from 'react-toastify';


const ModalProductForm = (props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!props.open) {
            form.resetFields();
        }
    }, [props.open]);

    useEffect(() => {
        if (props.open && props.formData.id) {
            form.setFieldsValue(props.formData);
        }
    }, [props.open, props.formData])

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
            let formData = new FormData()
            formData.append('_method', 'PUT');
            formData.append('name', values.name);
            formData.append('slug', values.slug);
            formData.append('price', values.price);
            formData.append('original_price', values.original_price);
            formData.append('description', values.description);
            formData.append('quantity', values.quantity);
            formData.append('size', values.size);
            formData.append('product_category_id', values.product_category_id);
            formData.append('status', values.status);
            if (!values.image_url.file) {
                formData.append('image_url', values.image_url);
            } else {
                formData.append('image_url', values.image_url.file.originFileObj);
            }
            // console.log(values.image_url.file.originFileObj)
            axios.post(`http://127.0.0.1:8000/api/v1/product/${values.id}`, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => { console.log(res) }).catch(err => { console.log(err.response.data) })
            props.onSubmit(props.formData.id);
            toast.success('Update Product success!');
        } else {
            let formdata = new FormData()
            formdata.append('name', values.name);
            formdata.append('slug', values.slug);
            formdata.append('price', values.price);
            formdata.append('original_price', values.original_price);
            formdata.append('description', values.description);
            formdata.append('quantity', values.quantity);
            formdata.append('size', values.size);
            formdata.append('product_category_id', values.product_category_id);
            formdata.append('status', values.status);
            formdata.append('image_url', values.image_url.file.originFileObj);
            // console.log(values.image_url.file.originFileObj)
            axios.post(`http://127.0.0.1:8000/api/v1/product/`, formdata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => { console.log(res) }).catch(err => { console.log(err.response.data) })
            props.onSubmit(props.formdata);
            toast.success('Create Product Success!');
        }
    }

    const onCancel = () => {
        if (!props.loading) {
            props.setOpen(false);
            props.setAction("CREATE")
        }
    }

    return (
        <div>
            <Modal open={props.open || props.loading} confirmloading={props.loading} onOk={onSubmitForm} onCancel={onCancel}  >
                <Form form={form} layout="vertical">
                    <Form.Item name="id" >
                        <h2 style={{ color: '#576574' }}>{props.action === 'CREATE' ? 'Create New Product' : 'Update Product'}</h2>
                        <Input name="id" hidden={true} />
                    </Form.Item>
                    <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input Name' }]}>
                        <Input name="name" type="text" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="slug" label="Slug" rules={[{ required: true, message: 'Please input Slug' }]}>
                        <Input name="slug" type="text" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input Price' }]}>
                        <Input name="price" type="number" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="original_price" label="Original price" rules={[{ required: true, message: 'Please input Original price' }]}>
                        <Input name="original_price" type="number" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input Description' }]}>
                        <Input name="description" type="text" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input Quantity' }]}>
                        <Input name="quantity" type="text" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="size" label="Size" rules={[{ required: true, message: 'Please input Size' }]}>
                        <Input name="size" type="text" onChange={onChange} />
                    </Form.Item>
                    <Form.Item name="product_category_id" label="Product Category Name" rules={[{ required: true, message: 'Please choose Product Category Name' }]}>
                        <Select name="product_category_id">
                            {props.selectProductCategory && props.selectProductCategory.length > 0
                                && props.selectProductCategory.map((data, index) => {
                                    return (
                                        <Select.Option
                                            key={index}
                                            value={data.id}
                                        >
                                            {data.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>

                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please choose Status of Product' }]}>
                        <Select name="staus" options={[
                            { value: '1', label: 'Show' },
                            { value: '0', label: 'Hide' },
                        ]} />
                    </Form.Item>

                    <Form.Item name={'image_url'} className="image_url"
                        label="Image Product"
                        rules={[{ required: true, message: 'Please input Image Product' }]}>
                        <Upload >
                            {props.action === 'UPDATE' ?
                                <img src={`${props.formData.image_url}`} alt="" height={175} width={125} style={{ margin: 20 }} />
                                :
                                <span></span>
                            }
                            <Button style={{ margin: 20 }}>Upload image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}
export default ModalProductForm;