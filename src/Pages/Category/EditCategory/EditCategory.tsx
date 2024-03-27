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
import useEditCategory from "../Service/Mutation/useEditCategory";
import useGetCategories from "../Service/Queries/useGetCategory";

type FieldType = {
  title: string;
  image?: any;
};

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetCategories();
  const { mutate, isLoading } = useEditCategory();
  const product = data?.results.find((item) => item.id == Number(id));

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image.file);
      formData.append("parent", "");

      await mutate(formData);
      message.success("Category edited successfully.");
      setTimeout(() => {
        navigate("/app/category");
      }, 1000);
    } catch (error) {
      console.error("Error creating category:", error);
      message.error("Failed to create category. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{
          title: product?.title || "",
          image: product?.image || undefined,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{ width: "500px" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input category title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          rules={[{ required: true, message: "Please upload category image!" }]}
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
    </div>
  );
};

export default EditCategory;
