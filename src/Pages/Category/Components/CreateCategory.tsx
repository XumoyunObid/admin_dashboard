import { Tabs } from "antd";
import React from "react";
import type { TabsProps } from "antd";
import CreateForm from "./CreateForm";
import CreateSubCategory from "../../Sub-Category/CreateSubCategory";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Create Category",
    children: <CreateForm />,
  },
  {
    key: "2",
    label: "Sub Category",
    children: <CreateSubCategory />,
  },
];

const CreateCategory: React.FC = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default CreateCategory;
