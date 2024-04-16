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
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useEditBanner from "../Services/Mutations/useEditBanner";
import useGetBanners from "../Services/Queries/useGetBanners";
import ReactQuill from "react-quill";
import { useState } from "react";

type FieldType = {
  title: string;
  description: string;
  image?: any;
};

const EditBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading: isloading } = useGetBanners();
  const { mutate, isLoading } = useEditBanner();
  const product = data?.results.find((item) => item.id == Number(id));

  const [value, setValue] = useState<string>("");

  const initialValues = {
    title: product?.title || "",
    description: product?.description || "",
    image: product?.image || undefined,
  };

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.image && typeof values.image !== "string")
        formData.append("image", values.image.file);
      formData.append("parent", "");

      await mutate(formData, {
        onSuccess: () => {
          message.success("Banner edited successfully.");
          navigate("/app/banners");
        },
      });
    } catch (error) {
      console.error("Error creating banner:", error);
      message.error("Failed to create banner. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleEditorChange = (content: string) => {
    setValue(content);
  };

  return (
    <div>
      {isloading ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ width: "500px" }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input category title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input banner description!" },
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

          <Form.Item
            name="image"
            rules={[
              {
                required: initialValues ? false : true,
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
            <Button
              type="primary"
              size="large"
              style={{ width: "100px" }}
              htmlType="submit"
            >
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
                "Edit"
              )}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditBanner;
