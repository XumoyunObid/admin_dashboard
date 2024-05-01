import React from "react";
import { Button, Image, Space, Table, Popconfirm, Skeleton } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDeleteSubCategory from "../../Sub-Category/Service/Mutations/useDeleteSubCategory";
import { clientQuery } from "./../../../Config/query-client";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string | any;
}

interface ChildType {
  children: {
    id: number;
    image: string;
    title: string;
  }[];
}

const SubCatTable: React.FC<ChildType> = ({ children }) => {
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const navigate = useNavigate();
  const { mutate, isLoading } = useDeleteSubCategory();
  const [active, _] = React.useState(false);

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
    if (children) {
      const newData: DataType[] = children?.map((category, index) => ({
        key: index.toString(),
        title: category.title,
        id: category.id,
        image: category.image,
      }));
      setDataSource(newData);
    }
  }, [children]);

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
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default SubCatTable;
