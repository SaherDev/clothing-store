import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import Home from "./pages/Home/Home";
import Topbar from "./components/topbar/Topbar";
import SideBar from "./components/sidebar/SideBar";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import ProductList from "./pages/productList/ProductList";
import NewProduct from "./pages/newProduct/NewProduct";
function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        {admin && (
          <>
            <Topbar />
            <div className="container">
              <SideBar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
