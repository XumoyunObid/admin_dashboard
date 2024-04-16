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
import useGetProducts from "./Service/Queries/useGetProducts";
import useDeleteProduct from "./Service/Mutations/useDeleteProduct";
import Search from "../../Components/Search/Search";
import useDebounce from "../../Hooks/useDebounce";
import useSearchProduct from "./Service/Mutations/useSearchProduct";

interface DataType {
  key: string;
  title: string;
  id: number;
  image: string | any;
  price: string;
}

const ProductsTable: React.FC = () => {
  const { data: CatData } = useGetProducts();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate, isLoading } = useDeleteProduct();
  const [active, _] = useState(false);
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data } = useSearchProduct(search);
  

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        clientQuery.invalidateQueries(["products"]);
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
        price: product.price,
      }));
      setDataSource(newData);
    }
  }, [CatData]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/create-product");
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
      title: "Product name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
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
            title="Are you sure to delete this product?"
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
          Create Product
        </Button>
        <Search data={data} value={value} setValue={setValue} />
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ProductsTable;
