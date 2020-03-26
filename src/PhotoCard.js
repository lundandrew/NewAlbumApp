import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditTitle from './EditTitle'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function PhotoCard(props) {
    
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <div>
            <Card style={{maxWidth: 345, marginRight: 10, marginTop: 10}}>
            <CardMedia
                component="img"
                height="300"
                image={props.photo.image}
            />
            <CardContent>
                <div style={{display: 'flex'}}>
                    <Typography style={{flexGrow:1}} gutterBottom variant="h5" component="h2">
                        {props.photo.title}
                    </Typography>
                    <IconButton onClick={() => {setDialogOpen(true)}}>
                        <EditIcon fontSize='default' />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
        <EditTitle user={props.user} album_id={props.album_id} photo={props.photo} open={dialogOpen} onClose={() => {setDialogOpen(false)}}/>
      </div>
    )
}