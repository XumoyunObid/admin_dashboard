import React from "react";
import { Button, Form, Input, Spin } from "antd";
import usePostUser from "../Service/Mutations/usePostLogin";
import { FormProps } from "react-hook-form";
// import Cookies from "js-cookie";
import { saveState } from "../../../Config/storage";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

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
  // const { register, handleSubmit, reset } = useForm<FieldType>(); // Move inside the component
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = (data: FieldType) => {
    console.log("Success:", data);
    mutate(data, {
      onSuccess: (res: any) => {
        // Cookies.set("token", res.token);
        saveState("token", res.token);
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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 25 }}
      style={{ maxWidth: 800 }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      // autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item
        label="Phone"
        name="phone_number"
        rules={[{ required: true, message: "Please input your number!" }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
  );
};

export default FormComponent;
