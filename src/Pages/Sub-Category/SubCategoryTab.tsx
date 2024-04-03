import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CreateSub from "./Components/CreateSub";
import CreateAttribute from "../Attributes/Components/CreateAttribute";

const SubCategoryTab: React.FC = () => {
  const [activekey, setActiveKey] = useState(1);
  const [parentID, setParentID] = useState();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Sub Category",
      children: (
        <CreateSub setActiveKey={setActiveKey} setParentID={setParentID} />
      ),
    },
    {
      key: "2",
      label: "Create Attribute",
      children: <CreateAttribute parentID={parentID} />,
    },
  ];

  return (
    <div>
      <Tabs activeKey={`${activekey}`} items={items} />
    </div>
  );
};

export default SubCategoryTab;
