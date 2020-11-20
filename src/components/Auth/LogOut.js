import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

import axios from "../../utils/axios";

import { setUser, removeUser } from "../../redux/redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: 8,
  },
  button: {
    margin: 8,
    width: "100%",
  },
  formContainer: {
    marginTop: "80px",
  },
  errorList: {
    backgroundColor: theme.palette.background.paper,
  },
  liText: {
    color: "red",
  },
}));

const LogOut = ({ removeUser }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    removeUser();
    axios.defaults.headers.common["Authorization"] = "";
    setTimeout(() => {
      history.push("/");
    }, 500);
  }, [removeUser, history]);

  return (
    <div className={classes.root}>
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "white", height: "100vh", marginTop: "2px" }}
      >
        <Typography
          variant="h5"
          component="h2"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          Thanks for visting the blog!
        </Typography>
      </Container>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
  removeUser,
};

export default connect(null, mapDispatchToProps)(LogOut);
