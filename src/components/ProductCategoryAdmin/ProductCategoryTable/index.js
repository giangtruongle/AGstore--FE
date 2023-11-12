import React from 'react';
import { Table } from "antd";
import './styled.scss'
import { FaBrush, FaBucket } from "react-icons/fa6";


const ProductCategoryTable = (props) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: "10%"
        },
        {
            title: 'Product Category Name',
            dataIndex: 'name',
            key: 'name',
            width: "30%"
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width: "20%"
        },
        {
            title: 'Product Category Image',
            dataIndex: 'image_url_pc',
            key: 'image_url_pc',
            width: "15%",
            render: (text, item) => {
                return <img src={text} width={100} alt="" />
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: "15%"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, item) => {
                return (
                    <div key={item.id}>

                        <FaBrush className="btn-edit-category"
                            onClick={() => { props.handleEdit(item.id) }} />

                        <FaBucket className="btn-delete-category"
                            onClick={() => { props.handleOnDelete(item.id) }} />
                    </div>
                )
            }
        },

    ]
    return (
        <div>
            <Table className="product-category-table"
                loading={props.loading}
                columns={columns}
                dataSource={props.dataSource}
            />
        </div>
    )
}
export default ProductCategoryTable;
