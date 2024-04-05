import React, { useState } from "react";
import { Button, Image, Space, Table, Popconfirm, Skeleton } from "antd";
import type { TableProps } from "antd";
import useGetCategories from "../Service/Queries/useGetCategory";
import { useNavigate } from "react-router-dom";
import useDeleteCategory from "../Service/Mutation/useDeleteCategory";
import { clientQuery } from "../../../Config/query-client";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
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
  const { data: CatData } = useGetCategories();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate, isLoading } = useDeleteCategory();
  const [active, _] = useState(false);
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data } = useSearchCategory(search);

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
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
  }, [CatData]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/create-category");
  };

  const handleEdit = (id: number) => {
    navigate(`/app/edit-category/${id}`);
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
      title: "Category name",
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
        {/* <div>
          <Input
            style={{
              width: "550px",
              padding: "10px",
              position: "relative",
              border: "2px solid #1677ff",
              borderRadius: "0px",
            }}
            onFocus={() => setShow(true)}
            type="text"
            placeholder="Search "
            onChange={(e) => setValue(e.target.value)}
          />
          {show && (
            <>
              {value.length > 2 && (
                <ul
                  style={{
                    top: 157,
                    border: "2px solid #1677ff",
                    padding: "15px",
                    backgroundColor: "white",
                    zIndex: 10,
                    position: "absolute",
                    width: "550px",
                    listStyle: "none",
                    borderTop: "none",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    outlineColor: "#1677ff",
                  }}
                >
                  {data?.results?.map(
                    (item: { title: string; id: number; image: string }) => (
                      <Link
                        key={item?.id}
                        to={`/app/edit-category/${item?.id}`}
                      >
                        <li
                          style={{
                            marginBottom: "15px",
                            padding: "5px",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Image width={80} src={item?.image} alt="" />
                          <p style={{ color: "black" }}>{item?.title}</p>
                        </li>
                      </Link>
                    )
                  )}
                </ul>
              )}
            </>
          )}
        </div> */}
        <Search data={data} value={value} setValue={setValue} />
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default CategoryTable;
