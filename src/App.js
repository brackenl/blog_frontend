import React from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import NavBar from "./components/NavBar";
import BlogList from "./components/BlogList/BlogList";
import SignUp from "./components/Auth/SignUp";
import LogIn from "./components/Auth/LogIn";
import FullBlog from "./components/FullBlog/FullBlog";
import EditBlogForm from "./components/BlogForm/EditBlogForm";
import NewBlogForm from "./components/BlogForm/NewBlogForm";
import LogOut from "./components/Auth/LogOut";
import ControlPanel from "./components/ControlPanel/ControlPanel";

const App = () => {
  return (
    <div className="App" style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <CssBaseline />
      <NavBar />
      <Switch>
        <Route path="/blogs/new">
          <NewBlogForm />
        </Route>
        <Route
          path="/blogs/:blogId/edit"
          render={(props) => <EditBlogForm {...props} />}
        ></Route>
        <Route path="/blogs/:blogId">
          <FullBlog />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/logout">
          <LogOut />
        </Route>
        <Route path="/control-panel">
          <ControlPanel />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
