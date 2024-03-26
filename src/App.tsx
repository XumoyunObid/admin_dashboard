import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import CreateCategory from "./Pages/Category/Components/CreateCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="create-category" element={<CreateCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
