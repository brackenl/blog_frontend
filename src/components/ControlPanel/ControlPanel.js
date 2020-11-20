import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";

import CPBlogListItem from "./CPBlogListItem";

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

  if (!props.user.username) {
    history.push("/");
  }

  useEffect(() => {
    axios.get("/blogs").then((results) => setBlogs(results.data));
  }, []);

  const handleEditClick = (id) => {
    const relBlog = blogs.find((blog) => blog._id === id);
    history.push({ pathname: `/blogs/${id}/edit`, state: relBlog });
  };

  const handlePublishClick = (id) => {
    const relBlog = blogs.find((blog) => blog._id === id);
    const updatedBlog = { ...relBlog, published: !relBlog.published };
    axios.put(`/blogs/${id}`, updatedBlog).then((results) => {
      const relIndex = blogs.findIndex((blog) => blog._id === results.data._id);
      const updatedBlogs = [...blogs];
      updatedBlogs[relIndex] = updatedBlog;
      setBlogs(updatedBlogs);
    });
  };

  const handleDeleteClick = (id) => {
    axios.delete(`/blogs/${id}`).then((results) => {
      const updatedBlogs = blogs.filter((blog) => blog._id !== id);
      setBlogs(updatedBlogs);
    });
  };

  const publishedBlogs = blogs.filter(
    (blog) => blog.author.username === props.user.username && blog.published
  );

  const unpublishedBlogs = blogs.filter(
    (blog) => blog.author.username === props.user.username && !blog.published
  );

  return (
    <div className={classes.root}>
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "white", height: "100vh", marginTop: "2px" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginLeft: 8, paddingTop: 20 }}
        >
          Published blogs
        </Typography>
        <div>
          <List>
            {publishedBlogs.map((filteredBlog) => {
              return (
                <CPBlogListItem
                  filteredBlog={filteredBlog}
                  handleEditClick={handleEditClick}
                  handlePublishClick={handlePublishClick}
                  handleDeleteClick={handleDeleteClick}
                  key={filteredBlog._id}
                />
              );
            })}
          </List>
        </div>
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginLeft: 8, paddingTop: 20 }}
        >
          Unpublished blogs
        </Typography>
        <div>
          <List>
            {unpublishedBlogs.map((filteredBlog) => {
              return (
                <CPBlogListItem
                  filteredBlog={filteredBlog}
                  handleEditClick={handleEditClick}
                  handlePublishClick={handlePublishClick}
                  handleDeleteClick={handleDeleteClick}
                  key={filteredBlog._id}
                  unpublished={true}
                />
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
