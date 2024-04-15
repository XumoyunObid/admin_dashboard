import React, { useState } from "react";
import { Button, Image, Space, Table, Popconfirm, Skeleton } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { clientQuery } from "../../Config/query-client";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import useGetBanners from "./Services/Queries/useGetBanners";
import useDeleteBanners from "./Services/Mutations/useDeleteBanner";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string | any;
}

const BannersTable: React.FC = () => {
  const { data: CatData } = useGetBanners();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate, isLoading } = useDeleteBanners();
  const [active, _] = useState(false);
  console.log(CatData);

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        clientQuery.invalidateQueries(["banners"]);
      },
      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  React.useEffect(() => {
    if (CatData) {
      const newData: DataType[] = CatData.results?.map((product, index) => ({
        key: index.toString(),
        title: product.title,
        id: product.id,
        image: product.image,
      }));
      setDataSource(newData);
    }
  }, [CatData]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/create-banner");
  };

  const handleEdit = (id: number) => {
    navigate(`/app/edit-product/${id}`);
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
      title: "Banner name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Change",
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
            title="Are you sure to delete this banner?"
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "100px",
        }}
      >
        <Button
          className="create-btn"
          type="primary"
          size="large"
          onClick={handleCreate}
          style={{ width: "200px" }}
        >
          <FolderAddOutlined />
          Create Banner
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default BannersTable;
