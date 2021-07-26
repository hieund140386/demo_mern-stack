import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Auth from "./views/Auth";
import { AuthContextProvider } from "./context/AuthContext";
import PostContextProvider from './context/PostContext';
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route
              path="/login"
              exact
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              path="/signup"
              exact
              render={(props) => <Auth {...props} authRoute="signup" />}
            />
            <ProtectedRoute 
              path="/dashboard"
              exact
              component={Dashboard}
            />
            <ProtectedRoute
              path='/about'
              exact
              component={About}
            />
            <Route 
              path="/"
              exact
            >
              <Redirect to='/login' />
            </Route>
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
