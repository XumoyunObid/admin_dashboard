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
} from "antd";
import useCreateCategory from "../../Category/Service/Mutation/useCreateCategory";
import useGetCategories from "../../Category/Service/Queries/useGetCategory";

type FieldType = {
  title: string;
  image?: any;
};

interface CreateSubProps {
  setActiveKey: React.Dispatch<React.SetStateAction<number>>;
  setParentID: React.Dispatch<React.SetStateAction<undefined>>;
}

const CreateSub: React.FC<CreateSubProps> = ({
  setActiveKey,
  setParentID,
}: any) => {
  const { mutate, isLoading } = useCreateCategory();
  const parents = useGetCategories();

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
      formData.append("parent", selectedParent || "");

      mutate(formData, {
        onSuccess: (res) => setParentID(() => res?.data?.id),
      });
      setActiveKey(2);
      message.success("Sub category created successfully.");
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
    setSelectedParent(value);
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
              defaultValue="Sub Category Title"
              style={{ width: 500 }}
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
