import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CreateForm from "./CreateForm";
import CreateSubCategory from "../../Sub-Category/Components/CreateSubCategory";

const onChange = (key: string) => {
  console.log(key);
};

const CreateCategory: React.FC = () => {
  // const [activekey, setActiveKey] = useState();

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

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default CreateCategory;
