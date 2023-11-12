import React from 'react';
import { Table } from "antd";
import './styled.scss';
import { FaBrush, FaBucket } from "react-icons/fa6";


const ProductTable = (props) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: "5%"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "10%"
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width: "10%"
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: "5%"
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: "25%"
        },
        {
            title: 'Image Product',
            dataIndex: 'image_url',
            key: 'image_url',
            width: "15%",
            render: (text, item) => {
                return <img src={text} width={100} alt="" />
            }
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: "5%"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: "5%"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, item) => {
                return (
                    <div key={item.id}>
                        <FaBrush className="btn-edit"
                            onClick={() => { props.handleEdit(item.id) }} />

                        <FaBucket className="btn-delete"
                            onClick={() => { props.handleOnDelete(item.id) }} />
                    </div>
                )
            }
        },
    ]
    return (
        <div>
            <Table className="product-table"
                loading={props.loading}
                columns={columns}
                dataSource={props.dataSource}
            />
        </div>
    )
}
export default ProductTable;
