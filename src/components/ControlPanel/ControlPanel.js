import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const ControlPanel = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blogs").then((results) => setBlogs(results.data));
  }, []);

  const handleEditClick = (id) => {
    const relBlog = blogs.find((blog) => blog._id === id);
    console.log(relBlog);
    history.push({ pathname: `/blogs/${id}/edit`, state: relBlog });
  };

  return (
    <div className={classes.root}>
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "white", height: "100vh", marginTop: "2px" }}
      >
        <Typography variant="h5" gutterBottom style={{ marginLeft: 8 }}>
          Published blogs
        </Typography>
        <div>
          <List>
            {blogs
              .filter(
                (blog) =>
                  blog.author.username === props.user.username && blog.published
              )
              .map((filteredBlog) => {
                return (
                  <ListItem key={filteredBlog._id}>
                    <ListItemText primary={filteredBlog.title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditClick(filteredBlog._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ControlPanel);
