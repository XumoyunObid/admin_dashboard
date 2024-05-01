import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import EditCategory from "./EditCategory";
import SubCatTable from "../Components/SubCatTable";

interface CategoryItem {
  id: number;
  image: string;
  title: string;
}

const EditCatAndSub: React.FC = () => {
  const [children, setChildren] = useState<CategoryItem[]>([]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Category",
      children: <EditCategory setChildren={setChildren} />,
    },
    {
      key: "2",
      label: "Sub Category",
      children: <SubCatTable children={children} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default EditCatAndSub;
