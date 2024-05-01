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
import SubCategoryTab from "./Pages/Sub-Category/SubCategoryTab";
import AttributeTable from "./Pages/Attributes/AttributeTable";
import EditSubAndAttrTab from "./Pages/Sub-Category/Components/EditSubAndAttrTab";
import Attribute from "./Pages/Attributes/Components/Attribute";
import ProductsTable from "./Pages/Products/ProductsTable";
import CreateProduct from "./Pages/Products/Components/CreateProduct";
import EditProduct from "./Pages/Products/Components/EditProduct";
import BannersTable from "./Pages/Banners/BannersTable";
import CreateBanner from "./Pages/Banners/Components/CreateBanner";
import EditBanner from "./Pages/Banners/Components/EditBanner";
import ProductVarinatsTable from "./Pages/ProductVariants/ProductVariantstable";
import Home from "./Pages/Home/Home";
import EditCatAndSub from "./Pages/Category/EditCategory/EditCatAndSub";
import CreateProductVariant from "./Pages/ProductVariants/Components/CreateProductVariant";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="edit-category/:id" element={<EditCatAndSub />} />
          <Route path="brands" element={<Brands />} />
          <Route path="edit-brand/:id" element={<EditBrand />} />
          <Route path="create-subcategory" element={<SubCategoryTab />} />
          <Route path="edit-subcategory/:id" element={<EditSubAndAttrTab />} />
          <Route path="create-brand" element={<CreateBrand />} />
          <Route path="attributes" element={<AttributeTable />} />
          <Route path="attribute/:id" element={<Attribute />} />
          <Route path="products" element={<ProductsTable />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="banners" element={<BannersTable />} />
          <Route path="create-banner" element={<CreateBanner />} />
          <Route path="edit-banner/:id" element={<EditBanner />} />
          <Route path="product-variants/" element={<ProductVarinatsTable />} />
          <Route
            path="create-product-variants/"
            element={<CreateProductVariant />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
