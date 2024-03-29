import { useNavigate } from "react-router-dom";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, FormProps, Upload, Spin } from "antd";
import useCreateBrands from "../Service/Mutation/useCreateBrand";

type FieldType = {
  title: string;
  image?: any;
};
const CreateBrand = () => {
  const { mutate, isLoading } = useCreateBrands();
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image.file);

      await mutate(formData);
      message.success("Brand created successfully.");
      setTimeout(() => {
        navigate("/app/brands");
      }, 1000);
    } catch (error) {
      console.error("Error creating brand:", error);
      message.error("Failed to create brand. Please try again later.");
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        style={{ width: "500px" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input brand title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          rules={[{ required: true, message: "Please upload brand image!" }]}
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

export default CreateBrand;
