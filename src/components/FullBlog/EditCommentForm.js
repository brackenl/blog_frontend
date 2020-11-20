import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  textField: {
    margin: 8,
  },
  button: {
    margin: 8,
    width: "100%",
  },
  formContainer: {
    marginTop: "20px",
  },
}));

const EditCommentForm = ({ clicked, content }) => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");

  const handleClick = () => {
    clicked(commentText);
  };

  useEffect(() => {
    setCommentText(content);
  }, []);

  return (
    <Card className={classes.root} style={{ marginBottom: "5px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit comment
        </Typography>
        <TextField
          id="commentField"
          label="Comment"
          placeholder="Comment"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          className={classes.textField}
          multiline
          rows={4}
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          Edit comment
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditCommentForm;
