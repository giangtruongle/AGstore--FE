import React from 'react';
import { Table } from "antd";
import './styled.scss';
import { FaBrush, FaBucket } from "react-icons/fa6";


const UserTable = (props) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: "15%"
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            width: "35%"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "35%"
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, item) => {
                return (

                    <div key={item.id}>

                        <FaBrush className="btn-edit-user"
                            onClick={() => { props.handleOnEdit(item.id); }} />

                        <FaBucket className="btn-delete-user"
                            onClick={() => { props.handleOnDelete(item.id) }} />
                    </div>
                )
            }
        },

    ]
    return (
        <div>
            <Table className="user-table"
                tableLoading={props.tableLoading}
                columns={columns}
                dataSource={props.dataSource}
            />
        </div>
    )
}
export default UserTable;
