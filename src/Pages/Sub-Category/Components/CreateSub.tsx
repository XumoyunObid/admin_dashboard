import { useNavigate } from "react-router-dom";
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
} from "antd";
import useCreateCategory from "../../Category/Service/Mutation/useCreateCategory";
import useGetCategories from "../../Category/Service/Queries/useGetCategory";

type FieldType = {
  title: string;
  image?: any;
};
const CreateSub = ({ parentID }: any) => {
  const { mutate, isLoading } = useCreateCategory();
  const navigate = useNavigate();
  const parents = useGetCategories();

  const parentOptions = parents?.data?.results.map((item) => item);
  console.log(parentOptions);

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image.file);
      formData.append("parent", parentID);

      await mutate(formData);
      message.success("Sub category created successfully.");
      setTimeout(() => {
        navigate("/app/category");
      }, 1000);
    } catch (error) {
      console.error("Error creating sub category:", error);
      message.error("Failed to create category. Please try again later.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
          label="Parent title"
          name="parent"
          rules={[
            { required: true, message: "Please select parent category title!" },
          ]}
        >
          <Space>
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={parentOptions}
            />
          </Space>
        </Form.Item>
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

export default CreateSub;
