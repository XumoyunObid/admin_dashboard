import React from "react";
import { Button, Image, Space, Table, Popconfirm } from "antd";
import type { TableProps } from "antd";
import useGetCategories from "../Service/Queries/useGetCategory";
import { useNavigate } from "react-router-dom";
import useDeleteCategory from "../Service/Mutation/useDeleteCategory";
import { clientQuery } from "../../../Config/query-client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string;
}

const CategoryTable: React.FC = () => {
  const { data: CatData } = useGetCategories();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate } = useDeleteCategory();

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: (res: any) => {
        console.log(res);
        clientQuery.invalidateQueries(["category"]);
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
  }, [CatData]); // Add handleDelete to the dependency array

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/create-category");
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
      render: (image: string) => <Image width={100} src={image} alt="" />,
    },
    {
      title: "Category name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Change",
      key: "change",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size="large" icon={<EditOutlined />}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
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
      >
        Create
      </Button>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default CategoryTable;
