import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  FormProps,
  Spin,
  Select,
  Space,
  Switch,
  SelectProps,
} from "antd";
import useCreateProduct from "../../Products/Service/Mutations/useCreateProduct";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import parse from "html-react-parser";
import useGetProducts from "../../Products/Service/Queries/useGetProducts";

type FieldType = {
  price: string;
  quantity: number;
  title: string;
  image?: any;
  is_new: boolean;
  is_available: boolean;
};

const CreateProductVariant: React.FC = () => {
  const { mutate, isLoading } = useCreateProduct();
  const [page] = useState(1);
  const parents = useGetProducts(page);
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const parsed = parse(value);
  let pars: string | undefined;

  if (typeof parsed === "string") {
    pars = parsed;
  } else if (React.isValidElement(parsed)) {
    const parsedElement = parsed as React.ReactElement;
    pars = parsedElement.props.children as string;
  }

  const parentOptions = parents?.data?.results.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const [selectedParent, setSelectedParent] = useState<string | undefined>(
    undefined
  );
  console.log(selectedParent);

  const handleEditorChange = (content: string) => {
    setValue(content);
  };

  const onFinish = (values: FieldType) => {
    try {
      const quantityValue =
        typeof values.quantity === "string"
          ? parseInt(values.quantity, 10)
          : values.quantity;

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("quantity", String(quantityValue));
      formData.append("is_new", values?.is_new ? "true" : "false");
      formData.append("is_available", values?.is_available ? "true" : "false");
      formData.append("product", selectedParent || "");
      formData.append("other_detail", pars || "");

      mutate(formData, {
        onSuccess: (res) => {
          console.log(res);
          message.success("Product variant created successfully.");
          navigate("/app/products");
        },
      });
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

  const handleChangeVal = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const options: SelectProps["options"] = [
    {
      label: "China",
      value: "china",
      desc: "China (中国)",
    },
    {
      label: "USA",
      value: "usa",
      desc: "USA (美国)",
    },
    {
      label: "Japan",
      value: "japan",
      desc: "Japan (日本)",
    },
    {
      label: "Korea",
      value: "korea",
      desc: "Korea (韩国)",
    },
  ];

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
              defaultValue="Product Title"
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
          label="Attribute values"
          name="attribute_value"
          rules={[
            { required: true, message: "Please input attribute values!" },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one country"
            onChange={handleChangeVal}
            options={options}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please input product quantity!" },
          ]}
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
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input product variant description!",
            },
          ]}
        >
          <ReactQuill
            placeholder="Product description"
            value={value}
            theme="snow"
            onChange={handleEditorChange}
            style={{ height: "220px", marginBottom: "50px" }}
          />
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

export default CreateProductVariant;
