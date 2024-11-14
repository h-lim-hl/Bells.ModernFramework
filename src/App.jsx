import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Register from './Register';
import About from './About';
import {Route, Switch} from 'wouter';
import './App.css'
import './styles.css'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
