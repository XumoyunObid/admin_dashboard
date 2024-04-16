import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import useCreateAttribute from "../Service/Mutation/useCreateAttribute";
import { useNavigate } from "react-router-dom";

interface CreateAttributeProps {
  parentID: string | undefined;
}
const CreateAttribute: React.FC<CreateAttributeProps> = ({ parentID }: any) => {
  const [form] = Form.useForm();
  const { mutate } = useCreateAttribute();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    try {
      const attributes = values?.attr_list?.map((i: any) => {
        return {
          attr_list: [
            {
              title: i.title,
              values: i.values?.map((item: any) => {
                return item.first;
              }),
              category: [parentID],
            },
          ],
        };
      });
      const attr_list = attributes[0];
      mutate(attr_list, {
        onSuccess: () => {
          navigate("/app/sub-category");
        },
      });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
      onFinish={onFinish}
    >
      <Form.List name="attr_list">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Attribute ${field.name + 1}`}
                key={field.key}
                extra={
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Attribute" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="value">
                  <Form.List name={[field.name, "values"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "first"]}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Value
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Attribute
            </Button>
          </div>
        )}
      </Form.List>
      <Button
        htmlType="submit"
        size="large"
        style={{ marginTop: "25px" }}
        type="primary"
      >
        Submit
      </Button>
    </Form>
  );
};

export default CreateAttribute;
