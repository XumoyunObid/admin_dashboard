import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!token) {
    navigate("/login");
  }

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      to: "/app",
    },
    {
      key: "2",
      icon: <FolderOutlined />,
      label: "Category List",
      to: "/app/category",
    },
    {
      key: "3",
      icon: <FolderOpenOutlined />,
      label: "Sub-category List",
      to: "/app/sub-category",
    },
    {
      key: "4",
      icon: <AppstoreOutlined />,
      label: "Brands List",
      to: "/app/brands",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            border: "none",
          }}
        >
          Logout
        </button>
      ),
      to: "/login",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.to} icon={item.icon}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
