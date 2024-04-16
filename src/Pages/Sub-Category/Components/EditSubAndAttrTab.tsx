import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import EditSubCategory from "./EditSubCategory";
import EditAttribute from "../../Attributes/Components/EditAttribute";

const EditSubAndAttrTab: React.FC = () => {
  const [parentID, setParentID] = useState<string | undefined>();
  const [attribute, setAttributes] = useState<string | undefined>();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Sub Category",
      children: (
        <EditSubCategory
          setAttributes={setAttributes}
          setParentID={setParentID}
        />
      ),
    },
    {
      key: "2",
      label: "Edit Attribute",
      children: <EditAttribute parentID={parentID} attribute={attribute} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default EditSubAndAttrTab;
