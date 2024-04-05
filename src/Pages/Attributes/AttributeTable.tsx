import React from "react";
import { Button, Space, Table, Popconfirm } from "antd";
import type { TableProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import useGetAttributes from "./Service/Query/useGetAttributes";
import { clientQuery } from "../../Config/query-client";
import { useNavigate } from "react-router-dom";
import useDeleteAttribute from "./Service/Mutation/useDeleteAttribute";

interface DataType {
  key: string;
  title: string;
  id: number;
  parent: string;
}

const AttributeTable: React.FC = () => {
  const { data: CatData } = useGetAttributes();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate } = useDeleteAttribute();

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: (res: any) => {
        console.log(res);
        clientQuery.invalidateQueries(["attributes"]);
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
        parent: <strong>{category?.category_title[0]?.title}</strong>,
      }));
      setDataSource(newData);
    }
  }, [CatData]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/create-category");
  };

  const handleEdit = (id: number) => {
    navigate(`/app/attribute/${id}`);
    console.log(id);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Parent category title",
      dataIndex: "parent",
      key: "parent",
    },

    {
      title: "Attribute name",
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
        style={{ width: "200px" }}
      >
        <FolderAddOutlined />
        Create Attribute
      </Button>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default AttributeTable;
