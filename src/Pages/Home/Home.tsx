import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
const Home = () => {
  const token = Cookies.get("token");
  if (!token) {
    <Navigate to="/login" />;
  }
  return <div></div>;
};

export default Home;
