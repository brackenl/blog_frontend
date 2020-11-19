import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { setUser, removeUser } from "../../redux/redux";

import axios from "../../utils/axios";

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

const LogIn = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isErrors, setIsErrors] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    props.setUser(loggedUser);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  const handleClick = () => {
    axios
      .post("/auth/login", {
        username: usernameInput,
        password: passwordInput,
      })
      .then((results) => {
        if (results.data.errors) {
          setIsErrors(true);
          setErrors(results.data.errors);
        }

        if (results.data.token) {
          setLoggedUser(results.data.user);
          setToken(results.data.token);
          history.push("/control-panel");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "white", height: "100vh", marginTop: "2px" }}
      >
        <div className={classes.formContainer}>
          <TextField
            id="usernameField"
            label="Username"
            placeholder="Username"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className={classes.textField}
            required
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <TextField
            id="passwordField"
            label="Password"
            placeholder="Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className={classes.textField}
            type="password"
            required
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          {isErrors ? (
            <div className={classes.errorList}>
              <List>
                {errors.map((error) => {
                  return (
                    <ListItem key={error.msg}>
                      <ListItemText
                        primary={error.msg}
                        className={classes.liText}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          ) : null}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleClick}
          >
            Log in
          </Button>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUser,
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
