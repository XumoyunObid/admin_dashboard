import React, { useState } from "react";
import { Button, Image, Space, Table, Popconfirm, Skeleton } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import useGetBrands from "./Service/Queries/useGetBrands";
import { clientQuery } from "../../Config/query-client";
import useDeleteBrand from "./Service/Mutation/useDeleteBrand";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string | any;
}

const Brands: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: CatData } = useGetBrands(page);
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const navigate = useNavigate();
  const { mutate, isLoading } = useDeleteBrand();
  const [active, _] = useState(false);

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: (res: any) => {
        console.log(res);
        clientQuery.invalidateQueries(["brands"]);
      },
      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  React.useEffect(() => {
    if (CatData) {
      const newData: DataType[] = CatData.results?.map((category, index) => ({
        key: index.toString(),
        title: category.title,
        id: category.id,
        image: category.image,
      }));
      setDataSource(newData);
    }
  }, [CatData]);

  const handleCreate = () => {
    navigate("/app/create-brand");
  };

  const handleEdit = (id: number) => {
    navigate(`/app/edit-brand/${id}`);
    console.log(id);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string | undefined) =>
        isLoading ? (
          <Skeleton.Image active={active} />
        ) : (
          <Image width={80} src={image} alt="" />
        ),
    },

    {
      title: "Brand name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Edit/Delete",
      key: "change",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="large"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this brand?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              size="large"
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="category">
      <Button
        className="create-btn"
        type="primary"
        size="large"
        onClick={handleCreate}
        style={{ width: "200px" }}
      >
        <FolderAddOutlined />
        Create Brand
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: CatData?.count || 0,
          current: page,
          pageSize: 20,
          onChange: (pageNum) => setPage(pageNum),
        }}
      />
    </div>
  );
};

export default Brands;
