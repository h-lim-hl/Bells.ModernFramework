import { useEffect, useMemo} from "react";
import { Route, Switch } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Register from './Register';
import About from './About';
import ShoppingCart from './ShoppingCart';
import UserLogin from "./UserLogin";

import './App.css'
import './styles.css'

function App() {
  const { clearMessage, getMessage } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {
    if(flashMessage.message) {
    const timer = setTimeout(() => {
      clearMessage();
    }, 3000);

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
      </Switch>
      <Footer />
    </>
  )
}

export default App
