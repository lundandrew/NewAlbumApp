import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from "./firebase";

export default function EditTitle(props) {
    const [newTitle,setNewTitle] = useState("")
    const handleChangeTitle = () => {
        db.collection('users').doc(props.user.uid).collection('albums').doc(props.album_id).collection('photos').doc(props.photo.id).update({title : newTitle}).then(() => {
            setNewTitle("")
        })
    }

return (
    <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle id="form-dialog-title">Enter a New Title for this Photo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Photo Title"
            type="email"
            defaultValue={props.photo.title}
            fullWidth
            onChange={(e) => {setNewTitle(e.target.value)}}
           />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => {handleChangeTitle()
          props.onClose()
        }}>
            Save
          </Button>
        </DialogActions>      
    </Dialog>
)
}