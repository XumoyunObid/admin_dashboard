import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MainLayout from "./Layout/MainLayout";
import Category from "./Pages/Category/Category";
import { Routes, Route } from "react-router-dom";
import SubCategory from "./Pages/Sub-Category/SubCategory";
import EditCategory from "./Pages/Category/EditCategory/EditCategory";
import CreateCategory from "./Pages/Category/Components/CreateCategory";
import Brands from "./Pages/Brands/Brands";
import CreateBrand from "./Pages/Brands/Components/CreateBrand";
import EditBrand from "./Pages/Brands/Components/EditBrand";
import EditSubCategory from "./Pages/Sub-Category/Components/EditSubCategory";
import CreateSub from "./Pages/Sub-Category/Components/CreateSub";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="brands" element={<Brands />} />
          <Route path="edit-brand/:id" element={<EditBrand />} />
          <Route path="create-subcategory" element={<CreateSub />} />
          <Route path="edit-subcategory/:id" element={<EditSubCategory />} />
          <Route path="create-brand" element={<CreateBrand />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
