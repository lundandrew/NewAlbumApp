import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { auth, db, snapshotToArray } from "./firebase";
import Photos from "./Photos";
import AddAlbum from "./AddAlbum";
import PublicFeed from "./PublicFeed"

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [optionOpen, setOptionOpen] = useState(false);
  const [albums, setAlbums] = useState([
    {id:0, title:"Nature"}, {id:1, title:"city"}
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  useEffect(() => {
    if  (user) {
      db.collection("users").doc(user.uid).collection("albums").onSnapshot((snapshot)=>{
        const updated_albums = snapshotToArray(snapshot)
        setAlbums(updated_albums)
      })
    }
  },[user])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            My Photo Albums
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List component ="nav">
          <ListItem button to={"/app/public"} component={Link}>
            <ListItemText primary="Public Feed"/>
          </ListItem>
          {albums.map((e) => {
            return(
            <ListItem button to={"/app/album/" + e.id + "/"} component ={Link} onClick={() => {setDrawerOpen(false)}}>
              <ListItemText primary={e.name}/>
            </ListItem>
            )
          })}
          <ListItem button onClick={() => {setOptionOpen(true)}}>
            <ListItemText primary="Create New Album" />
          </ListItem>
        </List>
      </Drawer>
      <AddAlbum open={optionOpen} onClose={() => {setOptionOpen(false)}} user={user}/>
      <Route path="/app/album/:album_id/" render={(routeProps)=> {
        return (<Photos user={user} {...routeProps} />
          )
      }} />
      <Route path="/app/public" render={(routeProps)=> {
        return (<PublicFeed user={user} {...routeProps}/>
        )
      }} />
    </div>
  );
}
