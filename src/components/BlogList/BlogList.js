import React, { useState, useEffect } from "react";

import axios from "../../utils/axios";

import { Container } from "@material-ui/core";

import BlogCard from "../BlogCard";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("/blogs/").then((result) => {
      setBlogs(result.data);
    });
  }, []);

  return (
    <Container
      maxWidth="lg"
      style={{ backgroundColor: "white", height: "100vh", marginTop: "2px" }}
    >
      <div style={{ paddingTop: "20px" }}>
        {blogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              content={blog.content}
              author={blog.author.username}
              timestamp={blog.timestamp}
              comments={blog.comments}
              id={blog._id}
              key={blog._id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default BlogList;
