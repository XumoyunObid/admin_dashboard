import { useNavigate } from "react-router-dom";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, FormProps, Upload, Spin } from "antd";
import useCreateBanner from "../Services/Mutations/useCreateBanner";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import parse from "html-react-parser";

type FieldType = {
  title: string;
  description: string;
  image?: any;
};
const CreateBanner = () => {
  const { mutate, isLoading } = useCreateBanner();
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

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", pars || "");
      formData.append("image", values.image.file);

      await mutate(formData);
      message.success("Banner created successfully.");
      setTimeout(() => {
        navigate("/app/banners");
      }, 1000);
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
          rules={[{ required: true, message: "Please input banner title!" }]}
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
          rules={[{ required: true, message: "Please upload banner image!" }]}
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

export default CreateBanner;
