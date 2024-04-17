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
  const [page, setPage] = useState(1);
  const { data: CatData, isLoading: isloading } = useGetBanners(page);
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate } = useDeleteBanners();
  const [active, _] = useState(false);

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
    navigate(`/app/edit-banner/${id}`);
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
        isloading ? (
          <Skeleton.Image active={active} />
        ) : (
          <div
            style={{
              width: "120px",
              height: "55px",
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              width={120}
              style={{ objectFit: "cover", height: "50px" }}
              src={image}
              alt=""
            />
          </div>
        ),
    },

    {
      title: "Banner name",
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

export default BannersTable;
