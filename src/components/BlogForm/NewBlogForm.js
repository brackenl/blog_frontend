import React, { useState } from "react";
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

const NewBlogForm = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [isErrors, setIsErrors] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleClick = () => {
    axios({
      method: "post",
      url: "/blogs/",
      data: {
        title: titleInput,
        content: contentInput,
      },
    })
      .then((results) => {
        if (results.data.errors) {
          setIsErrors(true);
          setErrors(results.data.errors);
        }

        if (results.data.content) {
          history.push(`/control-panel`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!props.user.username) {
    history.push("/login");
  }

  return (
    <div className={classes.root}>
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "white", height: "100vh", marginTop: "2px" }}
      >
        <div className={classes.formContainer}>
          <TextField
            id="titleField"
            label="Title"
            placeholder="Title"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className={classes.textField}
            required
            onChange={(e) => setTitleInput(e.target.value)}
            value={titleInput}
          />
          <TextField
            id="contentField"
            label="Content"
            placeholder="Content"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className={classes.textField}
            required
            multiline
            rows={6}
            onChange={(e) => setContentInput(e.target.value)}
            value={contentInput}
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
            Save blog
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

export default connect(mapStateToProps, mapDispatchToProps)(NewBlogForm);
