import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import useEditAttribute from "../Service/Mutation/useEditAttribute";
import useGetSingleAttribute from "../Service/Query/useGetSingleAttribute";
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

const CreateAttribute: React.FC = () => {
  const [form] = Form.useForm();
  const { data } = useGetSingleAttribute();
  const parentID = data?.category[0];

  const { mutate } = useEditAttribute();
  // const {mutate:DelValue} = useDeleteAttributeValue()
  const navigate = useNavigate();

  const initialValue = {
    attr_list: [
      {
        title: data?.title || "",
        values: data?.values.map((value: any) => ({
          first: value?.value || "",
        })) || [{ first: "" }],
      },
    ],
  };

  const onFinish = (values: any) => {
    try {
      const attributes = values?.attr_list?.map((i: any) => {
        return {
          attributes: [
            {
              attribute_id: data[0]?.id ?? null,
              title: i.title,
              values: i.values?.map((item: any, index: number) => {
                return {
                  value: item.first,
                  value_id: data[0]?.values[index]?.id ?? null,
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
          navigate("/app/attributes");
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

export default CreateAttribute;
