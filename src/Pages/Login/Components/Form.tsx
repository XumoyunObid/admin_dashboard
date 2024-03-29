import React from "react";
import { Button, Form, Input, Spin, FormProps } from "antd";
import usePostUser from "../Service/Mutations/usePostLogin";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

type FieldType = {
  phone_number: string;
  password: string;
};

const initialValues = {
  phone_number: "+998977109944",
  password: "87654321",
};

const FormComponent: React.FC = () => {
  const { mutate, isLoading } = usePostUser();
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = (data: FieldType) => {
    console.log("Success:", data);
    mutate(data, {
      onSuccess: (res: any) => {
        Cookies.set("token", res.token);
        navigate("/app");
        console.log(res);
      },
      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 800 }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        label="Phone"
        name="phone_number"
        rules={[{ required: true, message: "Please input your number!" }]}
        style={{ width: "400px" }}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        style={{ width: "400px" }}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          style={{ width: "400px" }}
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
            "Submit"
          )}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
