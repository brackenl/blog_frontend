import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";

import BlogCard from "../BlogCard";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

import "./FullBlog.css";

const FullBlog = (props) => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/blogs/${blogId}`).then((result) => {
      setBlog(result.data);
    });
  }, [blogId]);

  const handleCommentSubmit = (commentText) => {
    axios
      .post(`/blogs/${blogId}/comments`, {
        comment: commentText,
      })
      .then((result) => {
        const updatedBlog = {
          ...blog,
          comments: [...blog.comments, result.data],
        };
        setBlog(updatedBlog);
      });
  };

  const handleCommentDelete = (commentId) => {
    axios.delete(`/blogs/${blogId}/comments/${commentId}`).then((results) => {
      const updatedBlog = { ...blog };
      const updatedComments = updatedBlog.comments.filter(
        (comment) => comment._id !== commentId
      );
      updatedBlog.comments = updatedComments;
      setBlog(updatedBlog);
    });
  };

  if (!blog) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <Container
      maxWidth="lg"
      style={{ backgroundColor: "white", height: "100vh", paddingTop: "2px" }}
    >
      <BlogCard
        title={blog.title}
        content={blog.content}
        author={blog.author.username}
        timestamp={blog.timestamp}
        id={blog._id}
        hideButton={true}
        key={blog._id}
      />
      <Typography variant="h5" gutterBottom style={{ marginLeft: 8 }}>
        Comments
      </Typography>
      <Comments
        comments={blog.comments}
        user={props.user}
        deleteComment={handleCommentDelete}
      />
      {props.user.username ? (
        <CommentForm clicked={handleCommentSubmit} blogId={blogId} />
      ) : (
        <Typography
          variant="body1"
          component="p"
          style={{ margin: "20px 0 20px  8px" }}
        >
          Log in to comment on this post!
        </Typography>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(FullBlog);
