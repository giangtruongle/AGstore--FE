import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from '../Admin/UserTable';
import ModelFormUser from '../Admin/ModelFormUser';
import { Modal } from 'antd';
import Navbars from './Navbars';
import { toast } from 'react-toastify';

const DEFAULT_USER = { name: "", email: "", password: "" }

const Admin = () => {
    const [dataSource, setDataSource] = useState([])
    const [open, setOpen] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [formData, setFormData] = useState(DEFAULT_USER);
    const [actionUser, setActionUser] = useState("CREATE");
    const [formDataEdit, setFormDataEdit] = useState(DEFAULT_USER);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/users').then((res) => {
            setDataSource(res.data.data)
        })

    }, []);

    const fetchData = () => {
        setTableLoading(true)
        axios.get('http://127.0.0.1:8000/api/v1/users').then((res) => {
            setDataSource(res.data.data)
            setTableLoading(false)
        });
    };
    const onCreate = () => {
        setFormData(DEFAULT_USER);
        setOpen(true)

    };

    const handleOnEdit = (id) => {
        setActionUser("UPDATE")
        axios.get(`http://127.0.0.1:8000/api/v1/users/${id}`).then((res) => {
            setFormData(res.data);
            setFormDataEdit({
                name: res.data.name,
                email: res.data.email,
            })
            setOpen(true);
        })
    }
    const handleOnDelete = (id) => {
        Modal.confirm({
            title: "Are you sure to delete this user?",
            content: "User will be deleted after 1 second",
            onOk() {
                axios.delete(`http://127.0.0.1:8000/api/v1/users/${id}`).then((res) => {
                    fetchData();
                })
                toast.success('Delete Success!')
            }
        })
    }

    const onSubmit = (id, formData) => {
        if (id) {
            setSubmitLoading(true);
            axios.patch(`http://127.0.0.1:8000/api/v1/users/${id}`, formData).then((res) => {
                fetchData();
            });
            setSubmitLoading(false);
            setFormData(DEFAULT_USER);
            setOpen(false);
            toast.success('Update Success!')
        } else {
            setSubmitLoading(true);
            axios.post(`http://127.0.0.1:8000/api/v1/users`, formData).then((res) => {
                fetchData();
            });
            setSubmitLoading(false);
            setFormData(DEFAULT_USER);
            setOpen(false);
            toast.success('Create Success!')
        }
    }
    return (
        <div>
            <ModelFormUser
                loading={submitLoading}
                open={open}
                setOpen={setOpen}
                dataSource={dataSource}
                setFormData={setFormData}
                onSubmit={onSubmit}
                formData={formData}
                actionUser={actionUser}
                setActionUser={setActionUser}

            />
            <Navbars onCreate={onCreate} />
            <UserTable
                dataSource={dataSource}
                tableLoading={tableLoading}
                handleOnEdit={handleOnEdit}
                handleOnDelete={handleOnDelete}
            />

        </div>
    )
}
export default Admin;
