import React, { useState } from "react";
import { Button, Image, Space, Table, Popconfirm, Skeleton } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { clientQuery } from "../../Config/query-client";
import useGetSubCategories from "./Service/Queries/useGetSubCategory";
import useDeleteSubCategory from "./Service/Mutations/useDeleteSubCategory";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string | any;
}

const SubCategories: React.FC = () => {
  const { data: CatData } = useGetSubCategories();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const navigate = useNavigate();
  const { mutate, isLoading } = useDeleteSubCategory();
  const [active, _] = useState(false);

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: (res: any) => {
        console.log(res);
        clientQuery.invalidateQueries(["sub-category"]);
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
    navigate("/app/create-subcategory");
  };

  const handleEdit = (id: number) => {
    navigate(`/app/edit-subcategory/${id}`);
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
      title: "Sub Category name",
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
            title="Are you sure to delete this sub category?"
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
      <div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
        <Button
          className="create-btn"
          type="primary"
          size="large"
          onClick={handleCreate}
          style={{ width: "200px" }}
        >
          <FolderAddOutlined />
          Create Sub Category
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default SubCategories;
