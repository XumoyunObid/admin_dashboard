import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CreateForm from "./CreateForm";
import CreateSubCategory from "../../Sub-Category/Components/CreateSubCategory";

const onChange = (key: string) => {
  console.log(key);
};

const CreateCategory: React.FC = () => {
  const [activekey, setActiveKey] = useState(1);
  const [parentID, setParentID] = useState();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Category",
      children: (
        <CreateForm setActiveKey={setActiveKey} setParentID={setParentID} />
      ),
    },
    {
      key: "2",
      label: "Sub Category",
      children: <CreateSubCategory parentID={parentID} />,
    },
  ];

  return (
    <div>
      <Tabs activeKey={`${activekey}`} items={items} onChange={onChange} />
    </div>
  );
};

export default CreateCategory;
