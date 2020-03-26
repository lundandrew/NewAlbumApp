import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {db, storage} from "./firebase";
import uuid from 'node-uuid';

export default function AddPhoto(props) {
  const [photoTitle, setPhotoTitle] = useState ("")
  const [file, setFile] = useState (null)
  const [saving, setSaving] = useState (false)

  const handleSavePhoto = () => {
    setSaving(true)
    
    storage.ref("photos/" + uuid()).put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        db.collection('users').doc(props.user.uid).collection('albums').doc(props.album_id).collection('photos').add({title: photoTitle, image: downloadURL}).then(() => {
          setPhotoTitle("");
          setFile(null);
          setSaving(false)
          props.onClose();
        })

      })
    })

  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }
    return (
        <Dialog 
            open={props.open}
            onClose = {props.onClose}
            maxWidth="sm"
            fullWidth
        >
        <DialogTitle >Add a Photo</DialogTitle>
        <DialogContent>
          <TextField label="Photo Title" fullWidth={true} value = {photoTitle} onChange={(e) => {setPhotoTitle(e.target.value)}}></TextField>
          <div style={{display: 'flex', alignItems: 'center', marginTop:20}}> 
            
            <Button variant="contained"  component="label">
              Choose a File 
              <input type="file" onChange={handleFile} style={{display:'none'}}/>
            </Button>
            {file ? <Typography style={{marginLeft: 20}}>{file.name}</Typography> : <div/>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <div style={{position: 'relative'}}>
            <Button color="primary" variant="contained" onClick={handleSavePhoto}>
              Save
            </Button>
            {saving ? <CircularProgress style={{position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12}} color= "secondary" size={24}/>: <div/>}
          </div>
        </DialogActions>
      </Dialog>
    )
}