import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, FormProps, Upload, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import useEditCategory from "../Service/Mutation/useEditCategory";
import React from "react";
import useGetSingleCategory from "../Service/Queries/useGetSingleCategory";

type FieldType = {
  title: string;
  image?: any;
};
interface EditSubProps {
  setChildren: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        image: string;
        title: string;
      }[]
    >
  >;
}

const EditCategory: React.FC<EditSubProps> = ({ setChildren }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleCategory();
  const { mutate } = useEditCategory();
  // console.log(data);

  setChildren(data?.children);

  const initialValues = {
    title: data?.title || "",
    image: data?.image || undefined,
  };

  const onFinish = async (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      if (values.image && typeof values.image !== "string")
        formData.append("image", values.image.file);
      formData.append("parent", "");

      await mutate(formData, {
        onSuccess: () => {
          message.success("Category edited successfully.");
          navigate("/app/category");
        },
      });
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
      {isLoading ? (
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
            name="image"
            rules={[
              {
                // required: initialValues ? false : true,
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

          {/* {data?.image ? (
            <Form.Item>
              <Image
                style={{
                  width: "100px",
                }}
                src={data?.image}
              />
            </Form.Item>
          ) : (
            ""
          )} */}

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

export default EditCategory;
