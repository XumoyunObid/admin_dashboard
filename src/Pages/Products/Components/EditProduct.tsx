import { useNavigate, useParams } from "react-router-dom";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  FormProps,
  Upload,
  Spin,
  Image,
  Switch,
} from "antd";
import useEditProduct from "../Service/Mutations/useEditProduct";
import useGetProducts from "../Service/Queries/useGetProducts";
import { clientQuery } from "../../../Config/query-client";
import { useState } from "react";

type FieldType = {
  title: string;
  price: string;
  image?: any;
  is_new: boolean;
  is_available: boolean;
};
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page] = useState(1);
  const { data, isLoading: isloading } = useGetProducts(page);
  const product = data?.results.find((item) => item.id == Number(id));
  const { mutate, isLoading } = useEditProduct();

  const initialValue: FieldType = {
    title: product?.title || "",
    price: product?.price || "",
    image: product?.image || undefined,
    is_new: product?.is_new || false,
    is_available: product?.is_available || false,
  };

  const onFinish = (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      if (values.image && typeof values.image !== "string")
        formData.append("image", values.image.file);
      formData.append("is_new", values.is_new.toString());
      formData.append("is_available", values.is_available.toString());

      mutate(formData, {
        onSuccess: (res) => {
          console.log(res);
          message.success("Product edited successfully.");
          navigate("/app/products");
          clientQuery.invalidateQueries("products");
        },
      });
    } catch (error) {
      console.error("Error editing product", error);
      message.error("Failed to edit roduct. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (checked: boolean, fieldName: string) => {
    console.log(`Switch ${fieldName} changed to ${checked}`);
  };

  return (
    <div>
      {!isloading ? (
        <Form
          name="basic"
          initialValues={initialValue}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          style={{ width: "500px" }}
        >
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
            <Form.Item label="Is new?" name="is_new" valuePropName="checked">
              <Switch onChange={(checked) => onChange(checked, "is_new")} />
            </Form.Item>

            <Form.Item
              label="Is available?"
              name="is_available"
              valuePropName="checked"
            >
              <Switch
                onChange={(checked) => onChange(checked, "is_available")}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="image"
            rules={[
              {
                required: initialValue ? false : true,
                message: "Please upload category image!",
              },
            ]}
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

          {product?.image ? (
            <Form.Item>
              <Image
                style={{
                  width: "100px",
                }}
                src={product?.image}
              />
            </Form.Item>
          ) : (
            ""
          )}

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
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default EditProduct;
