import React, { useState } from "react";
import { Button, Image, Space, Table, Popconfirm, Skeleton } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useGetCategories from "../Service/Queries/useGetCategory";
import useDeleteCategory from "../Service/Mutation/useDeleteCategory";
import useDebounce from "../../../Hooks/useDebounce";
import useSearchCategory from "../Service/Queries/useSearchCategory";
import Search from "../../../Components/Search/Search";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string | any;
}

const CategoryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: CatData } = useGetCategories(page);
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate, isLoading } = useDeleteCategory();
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data } = useSearchCategory(search);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        setPage(1);
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
    navigate("/app/create-category");
  };

  const handleEdit = (id: number) => {
    navigate(`/app/edit-category/${id}`);
  };

  const columns = [
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
          <Skeleton.Image active />
        ) : (
          <Image width={80} src={image} alt="" />
        ),
    },
    {
      title: "Category name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Change",
      key: "change",
      render: (_: any, record: { id: number }) => (
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
          Create Category
        </Button>
        <Search data={data} value={value} setValue={setValue} />
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

export default CategoryTable;
