import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import CreateCategory from "./Pages/Category/Components/CreateCategory";
import EditCategory from "./Pages/Category/EditCategory/EditCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
