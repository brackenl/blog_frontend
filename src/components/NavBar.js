import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  homeButton: {},
}));

const NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleLogInClick = () => {
    history.push("/login");
  };

  const handleSignUpClick = () => {
    history.push("/signup");
  };

  const handleNewBlogClick = () => {
    history.push("/blogs/new");
  };

  const handleLogOutClick = () => {
    history.push("/logout");
  };

  const handleControlPanelClick = () => {
    history.push("/control-panel");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleHomeClick}
          >
            The Blog
          </Typography>

          {props.user.username ? (
            <>
              {props.user.admin ? (
                <>
                  <Button color="inherit" onClick={handleControlPanelClick}>
                    Control Panel
                  </Button>
                  <Button color="inherit" onClick={handleNewBlogClick}>
                    New post
                  </Button>
                </>
              ) : null}
              <Button color="inherit" onClick={handleLogOutClick}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogInClick}>
                Login
              </Button>
              <Button color="inherit" onClick={handleSignUpClick}>
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(NavBar);
