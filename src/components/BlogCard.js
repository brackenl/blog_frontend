import React from "react";
import format from "date-fns/format";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "10px",
    marginBottom: "20px",
    backgroundColor: "rgb(242, 242, 242)",
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
});

const BlogCard = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/blogs/${props.id}`);
  };

  let commentVal = !props.comments
    ? "0 comments"
    : props.comments.length === 0
    ? "No comments"
    : props.comments.length === 1
    ? "1 comment"
    : `${props.comments.length} comments`;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.author} on {format(new Date(props.timestamp), "dd MMMM yyyy")}
        </Typography>
        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions style={props.hideButton ? { display: "none" } : {}}>
        <Button size="small" onClick={handleClick}>
          {commentVal}
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
