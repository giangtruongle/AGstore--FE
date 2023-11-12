import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import NavbarProduct from "./NavbarProduct";
import axios from "axios";
import ModalProductForm from "./ModalProductForm";
import App from "../../App";
import { toast } from 'react-toastify';
import { Modal } from 'antd';

const DEFAULT_PRODUCT = {
    id: '', name: "", slug: "", price: "", description: "",
    quantity: "", image_url: "", weight: "", status: "",
    product_category_id: "", original_price: ""
};


const Product = () => {

    const [dataSource, setDataSource] = useState([]);
    const [formdata, setFormData] = useState(DEFAULT_PRODUCT);
    const [open, setOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false);
    const [action, setAction] = useState("CREATE");
    const [selectProductCategory, setSelectProductCategory] = useState([]);

    useEffect(() => {
        axios.get(`api/v1/product`).then((res) => {
            setDataSource(res.data.data);
        })
    }, [])

    useEffect(() => {
        axios.get(`api/v1/product-category`).then((res) => {
            setSelectProductCategory(res.data.data);
        })
    }, [])

    const fetchData = () => {
        setTableLoading(true)
        axios.get(`api/v1/product`).then((res) => {
            setDataSource(res.data.data);
            setTableLoading(false)
        })
    }

    const onCreateProduct = () => {
        setFormData(DEFAULT_PRODUCT);
        setOpen(true);
    }

    const handleEdit = (id) => {
        console.log(id)
        setAction('UPDATE')
        axios.get(`api/v1/product/${id}`).then((res) => {
            setFormData(res.data)
            setOpen(true)
        })
    }
    console.log(formdata)
    const handleOnDelete = (id) => {
        Modal.confirm({
            title: "Are you sure to delete this product?",
            content: `Product will be deleted after 1 second`,

            onOk() {
                axios.delete(`api/v1/product/${id}`).then((res) => {
                    fetchData();
                })
                toast.success('Delete Success!')
            }
        })
    }

    const onSubmit = (id) => {
        setSubmitLoading(true);
        if (id) {
            axios.get(`api/v1/product/${id}`).then((res) => {
                fetchData();
            });
            setSubmitLoading(false);
            setFormData(DEFAULT_PRODUCT);
            setOpen(false);
            setAction("CREATE")

        } else {
            axios.get(`api/v1/product/`).then((res) => {
                fetchData();
            })
            setSubmitLoading(false);
            setFormData(DEFAULT_PRODUCT);
            setOpen(false);

        }
    }

    return (
        <div>
            <NavbarProduct onCreateProduct={onCreateProduct} />

            <ModalProductForm
                loading={submitLoading}
                open={open}
                setOpen={setOpen}
                formData={formdata}
                setFormData={setFormData}
                onSubmit={onSubmit}
                action={action}
                setAction={setAction}
                selectProductCategory={selectProductCategory}
            />
            <ProductTable
                handleOnDelete={handleOnDelete}
                handleEdit={handleEdit}
                dataSource={dataSource}
                loading={tableLoading}
            />
            <App />
        </div>
    )
}
export default Product;