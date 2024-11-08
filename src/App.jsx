import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import OtherPage from './OtherPage';
import {Route, Switch} from 'wouter';
import './App.css'
import './styles.css'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/About" component={OtherPage} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
