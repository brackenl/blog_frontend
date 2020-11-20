import React, { useState } from "react";

import format from "date-fns/format";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, CardContent, Typography } from "@material-ui/core";
import EditCommentForm from "./EditCommentForm";

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

const CommentCard = ({ editComment, comment, deleteComment, user }) => {
  const classes = useStyles();
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleShowEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleEditClick = (commentText) => {
    editComment(comment._id, commentText);
    setShowEditForm(false);
  };

  return (
    <>
      <Card
        className={classes.root}
        key={comment._id}
        style={{ marginBottom: "5px", display: showEditForm ? "none" : "" }}
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
            {format(new Date(comment.timestamp), "dd MMMM yyyy 'at' HH:mm")}{" "}
            {comment.edited
              ? `(Last edited on ${format(
                  new Date(comment.editedTimestamp),
                  "dd MMMM yyyy 'at' HH:mm"
                )})`
              : null}
          </Typography>
          {user.username === comment.user.username ? (
            <div style={{ marginTop: "5px" }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.commentButton}
                onClick={toggleShowEditForm}
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
      {showEditForm ? (
        <EditCommentForm content={comment.comment} clicked={handleEditClick} />
      ) : null}
    </>
  );
};

export default CommentCard;
