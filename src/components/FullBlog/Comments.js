import React from "react";

import format from "date-fns/format";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, CardContent, Typography } from "@material-ui/core";
import CommentForm from "./CommentForm";

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

const Comments = ({ user, comments, deleteComment }) => {
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
        <>
          <Card
            className={classes.root}
            key={comment._id}
            style={{ marginBottom: "5px" }}
          >
            <CardContent>
              <Typography variant="body2" component="p">
                {comment.comment}
              </Typography>

              <Typography
                className={classes.pos}
                color="textSecondary"
                variant="caption"
              >
                {comment.user.username} on{" "}
                {format(new Date(comment.timestamp), "dd MMMM yyyy 'at' HH:mm")}
              </Typography>
              {user.username === comment.user.username ? (
                <div style={{ marginTop: "5px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.commentButton}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.commentButton}
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </>
      );
    });
  }

  return postComments;
};

export default Comments;
