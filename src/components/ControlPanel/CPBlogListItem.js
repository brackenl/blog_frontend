import React, { useState } from "react";
import format from "date-fns/format";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UndoIcon from "@material-ui/icons/Undo";

import ConfirmDialog from "./ConfirmDialog";

const CPBlogList = ({
  filteredBlog,
  handleEditClick,
  handlePublishClick,
  handleDeleteClick,
  unpublished,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ConfirmDialog
        open={openDialog}
        handleClickOpen={handleDialogOpen}
        handleClose={handleDialogClose}
        handleDeleteClick={handleDeleteClick}
        id={filteredBlog._id}
      />
      <ListItem>
        <ListItemText
          primary={filteredBlog.title}
          secondary={format(
            new Date(filteredBlog.timestamp),
            "dd MMMM yyyy 'at' HH:mm"
          )}
        />
        <ListItemSecondaryAction>
          {unpublished ? (
            <IconButton
              edge="end"
              aria-label="publish"
              onClick={() => handlePublishClick(filteredBlog._id)}
            >
              <PublishIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              aria-label="undo-publish"
              onClick={() => handlePublishClick(filteredBlog._id)}
            >
              <UndoIcon />
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleEditClick(filteredBlog._id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDialogOpen}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default CPBlogList;
