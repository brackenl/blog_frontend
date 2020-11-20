import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import CommentCard from "./CommentCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  commentButton: {
    marginRight: "10px",
    padding: "1px 5px",
    fontSize: "10px",
  },
}));

const Comments = ({ user, comments, deleteComment, editComment }) => {
  const classes = useStyles();

  let postComments = (
    <Card className={classes.root} style={{ marginBottom: "5px" }}>
      <CardContent>
        <Typography variant="body2" component="p">
          Be the first to comment!
        </Typography>
      </CardContent>
    </Card>
  );

  if (comments.length > 0) {
    postComments = comments.map((comment) => {
      return (
        <CommentCard
          comment={comment}
          deleteComment={deleteComment}
          user={user}
          editComment={editComment}
          key={comment._id}
        />
      );
    });
  }

  return postComments;
};

export default Comments;
