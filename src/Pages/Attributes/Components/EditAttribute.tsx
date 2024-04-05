import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import useEditAttribute from "../Service/Mutation/useEditAttribute";
// import useDeleteAttributeValue from "../Service/Mutation/useDeleteAttributeValue";

interface AttrType {
  attributes: {
    attribute_id?: string;
    title: string;
    values: {
      value: string;
      value_id: string;
    }[];
  }[];
  category_id: string;
}

const EditAttribute: React.FC = ({ parentID, attribute }: any) => {
  const [form] = Form.useForm();
  const { mutate } = useEditAttribute();
  // const {mutate:DelValue} = useDeleteAttributeValue()
  const navigate = useNavigate();

  const initialValue = {
    attr_list: attribute?.map((attr: { title: any; values: any[] }) => ({
      title: attr.title || "",
      values: attr.values?.map((i) => ({ first: i.value })) || [{ first: "" }],
    })),
  };

  const onFinish = (values: any) => {
    try {
      const attributes = values?.attr_list?.map((i: any) => {
        return {
          attributes: [
            {
              attribute_id: attribute[0]?.id ?? null,
              title: i.title,
              values: i.values?.map((item: any, index: number) => {
                return {
                  value: item.first,
                  value_id: attribute[0]?.values[index]?.id ?? null,
                };
              }),
            },
          ],
        };
      });
      const attr: AttrType = {
        attributes: attributes[0]?.attributes,
        category_id: parentID ?? null,
      };
      mutate(attr, {
        onSuccess: () => {
          navigate("/app/sub-category");
        },
      });
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  // const handleDeleteValue =()=> {

  // }

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={initialValue}
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

export default EditAttribute;
