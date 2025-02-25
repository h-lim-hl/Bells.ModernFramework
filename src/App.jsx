import { useEffect, useMemo } from "react";
import { Route, Switch } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Register from './Register';
import About from './About';
import ShoppingCart from './ShoppingCart';
import UserLogin from "./UserLogin";
import Checkout from "./Checkout";
import UserLogout from "./UserLogout";
import StockManagement from "./StockManagement";

import './App.css'
import './styles.css'

function App() {
  const { clearMessage, getMessage } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {
    if (flashMessage.message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  return (
    <>
      <Navbar />
      {
        flashMessage.message &&
        (<div className={`alert alert-${flashMessage.type} text-center flash-alert`}>
          {flashMessage.message}
        </div>)
      }
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/login" component={UserLogin} />
        <Route path="/stock" component={StockManagement} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={UserLogout} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
