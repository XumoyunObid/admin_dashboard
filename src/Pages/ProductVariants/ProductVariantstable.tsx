import React from "react";
import { Button, Space, Table, Popconfirm } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { clientQuery } from "../../Config/query-client";
import {
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import useDeleteProduct from "../Products/Service/Mutations/useDeleteProduct";
// import Search from "../../Components/Search/Search";
// import useDebounce from "../../Hooks/useDebounce";
// import useSearchProduct from "../Products/Service/Mutations/useSearchProduct";
import useGetProductVariants from "./Service/Queries/useGetProductVariants";

interface DataType {
  key: string;
  title: string;
  id: number;
  price: string;
}

const ProductVarinatsTable: React.FC = () => {
  const { data: CatData } = useGetProductVariants();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const { mutate } = useDeleteProduct();
  console.log(CatData);

  // const [value, setValue] = useState("");
  // const search = useDebounce(value);
  // const { data } = useSearchProduct(search);

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
        price: product.price,
      }));
      setDataSource(newData);
    }
  }, [CatData]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/app/create-product-variants/");
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
          Create Product Variant
        </Button>
        {/* <Search data={data} value={value} setValue={setValue} /> */}
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ProductVarinatsTable;
