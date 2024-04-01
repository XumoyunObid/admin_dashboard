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
} from "antd";
import useGetSubCategories from "../Service/Queries/useGetSubCategory";
import useEditSubCategory from "../Service/Mutations/useEditSubCategory";

type FieldType = {
  title: string;
  image?: any;
};
const EditSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSubCategories();
  const { mutate, isLoading } = useEditSubCategory();

  const product = data?.results.find((item) => item.id == Number(id));

  const initialValue = {
    title: product?.title || "",
    image: product?.image || undefined,
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
    </div>
  );
};

export default EditSubCategory;
