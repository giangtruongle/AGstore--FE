import React, { useEffect, useState } from "react";
import ProductCategoryTable from "./ProductCategoryTable";
import NavbarProductCategory from "./NavbarProductCategory";
import axios from "axios";
import { Modal } from 'antd';
import App from "../../App";
import { toast } from 'react-toastify';
import ModalProductCategoryForm from "./ModalProductCategoryForm";

const DEFAULT_PRODUCT_CATEGORY = { id: '', name: "", slug: "", status: "" }

const ProductCategoryAdmin = () => {

    const [dataSource, setDataSource] = useState([]);
    const [formData, setFormData] = useState(DEFAULT_PRODUCT_CATEGORY);
    const [open, setOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [actionButton, setActionButton] = useState('CREATE')

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/product-category`).then((res) => {
            setDataSource(res.data.data);
        })
    }, [])

    const fetchData = () => {
        setTableLoading(true)
        axios.get('http://127.0.0.1:8000/api/v1/product-category').then((res) => {
            setDataSource(res.data.data)
            setTableLoading(false)
        });
    };

    const onCreateNew = () => {
        setFormData(DEFAULT_PRODUCT_CATEGORY)
        setOpen(true)
    }

    const handleEdit = (id) => {
        setActionButton('UPDATE')
        axios.get(`http://127.0.0.1:8000/api/v1/product-category/${id}`).then((res) => {
            setFormData(res.data)
            setOpen(true)
        })
    }

    const handleOnDelete = (id) => {
        Modal.confirm({
            title: "Are you sure to delete this Product Category?",
            content: "Product Category will be deleted after 1 second",
            onOk() {
                axios.delete(`http://127.0.0.1:8000/api/v1/product-category/${id}`).then((res) => {
                    fetchData();
                })
                toast.success('Delete Success!')
            }
        })
    }

    const onSubmit = (id) => {
        setSubmitLoading(true)
        if (id) {
            axios.get(`http://127.0.0.1:8000/api/v1/product-category/${id}`).then((res) => {
                fetchData();
            });
            setSubmitLoading(false);
            setFormData(DEFAULT_PRODUCT_CATEGORY);
            setOpen(false);
            setActionButton('CREATE')
        }
    }

    return (
        <div>
            <NavbarProductCategory onCreateNew={onCreateNew} />

            <ModalProductCategoryForm
                open={open}
                setOpen={setOpen}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                setSubmitLoading={setSubmitLoading}
                actionButton={actionButton}
                setActionButton={setActionButton}
            />

            <ProductCategoryTable
                handleOnDelete={handleOnDelete}
                handleEdit={handleEdit}
                dataSource={dataSource}
                loading={tableLoading}
            />

            <App />
        </div>
    )
}
export default ProductCategoryAdmin;