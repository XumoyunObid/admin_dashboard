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
  Image,
} from "antd";
import useEditSubCategory from "../Service/Mutations/useEditSubCategory";
import useGetSingleSubCategories from "../Service/Queries/useGetSingleSub";

type FieldType = {
  title: string;
  image?: any;
};
const EditSubCategory = ({ setParentID, setAttributes }: any) => {
  const navigate = useNavigate();
  const { data } = useGetSingleSubCategories();
  const { mutate, isLoading } = useEditSubCategory();
  console.log(data);

  setParentID(() => data?.id);
  setAttributes(() => data?.attributes);

  const initialValue = {
    title: data?.title || "",
    image: data?.image || undefined,
  };

  const onFinish = (values: FieldType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      if (values.image && typeof values.image !== "string")
        formData.append("image", values.image.file);

      mutate(formData, {
        onSuccess: () => {
          message.success("Sub category edited successfully.");
          setTimeout(() => {
            navigate("/app/sub-category");
          }, 1000);
        },
      });
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

  return (
    <div>
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
          rules={[{ required: true, message: "Please input category title!" }]}
        >
          <Input />
        </Form.Item>

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

        {data?.image ? (
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
    </div>
  );
};

export default EditSubCategory;
