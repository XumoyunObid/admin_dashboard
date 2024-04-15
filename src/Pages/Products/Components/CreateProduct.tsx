import React, { useState } from "react";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  FormProps,
  Upload,
  Spin,
  Select,
  Space,
  Switch,
} from "antd";
import useGetCategories from "../../Category/Service/Queries/useGetCategory";
import useCreateProduct from "../Service/Mutations/useCreateProduct";
import { useNavigate } from "react-router-dom";

type FieldType = {
  price: string;
  title: string;
  image?: any;
  is_new: boolean;
  is_available: boolean;
};

const CreateProduct: React.FC = () => {
  const { mutate, isLoading } = useCreateProduct();
  const parents = useGetCategories();
  const navigate = useNavigate();

  const parentOptions = parents?.data?.results.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const [selectedParent, setSelectedParent] = useState<string | undefined>(
    undefined
  );

  const onFinish = (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image.file);
      formData.append("price", values.price);
      formData.append("is_new", values?.is_new ? "true" : "false");
      formData.append("is_available", values?.is_available ? "true" : "false");
      formData.append("category", selectedParent || "");

      mutate(formData, {
        onSuccess: (res) => console.log(res),
      });
      message.success("Product created successfully.");
      navigate("/app/products");
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Failed to create product. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedParent(value);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        style={{ width: "500px" }}
      >
        <Form.Item label="Parent title" name="parent">
          <Space>
            <Select
              defaultValue="Category Title"
              style={{ width: 500 }}
              onChange={handleChange}
              options={parentOptions}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input product title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input />
        </Form.Item>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Form.Item label="Is new?" name="is_new">
            <Switch onChange={onChange} />
          </Form.Item>

          <Form.Item label="Is available?" name="is_available">
            <Switch onChange={onChange} />
          </Form.Item>
        </div>

        <Form.Item
          name="image"
          rules={[{ required: true, message: "Please upload product image!" }]}
          valuePropName="file"
        >
          <Upload.Dragger
            name="file"
            beforeUpload={() => false}
            maxCount={1}
            listType="picture-card"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            {isLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "white" }}
                    spin
                  />
                }
              />
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
