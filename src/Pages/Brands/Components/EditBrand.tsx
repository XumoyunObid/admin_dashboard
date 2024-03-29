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
import useEditBrand from "../Service/Mutation/useEditBrand";
import useGetBrands from "../Service/Queries/useGetBrands";

type FieldType = {
  title: string;
  image?: any;
};

const EditBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetBrands();
  const { mutate, isLoading } = useEditBrand();
  const product = data?.results.find((item) => item.id == Number(id));
  console.log(product);

  const initialValues = {
    title: product?.title || "",
    image: product?.image || undefined,
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
          message.success("Brand edited successfully.");
          navigate("/app/brands");
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
          rules={[{ required: true, message: "Please input category title!" }]}
        >
          <Input />
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
    </div>
  );
};

export default EditBrand;
