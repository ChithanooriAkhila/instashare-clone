import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
// import Home from './components/Home'
// import Products from './components/Products'
// import ProductItemDetails from './components/ProductItemDetails'
// import Cart from './components/Cart'
import NotFound from './components/NotFound'
// import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import UserStoriesList from './components/UserStoriesList'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <UserStoriesList />
        <Header />
        {/* <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute
          exact
          path="/products/:id"
          component={ProductItemDetails}
        />
        <ProtectedRoute exact path="/cart" component={Cart} /> */}
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App
