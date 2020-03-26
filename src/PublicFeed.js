import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import PublicPhotoCard from "./PublicPhotoCard";
import Button from "@material-ui/core/Button";
import { db, snapshotToArray } from "./firebase";

export default function PublicFeed(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collectionGroup("photos").onSnapshot(snapshot => {
      const updated_photos = snapshotToArray(snapshot);
      setPhotos(updated_photos);
    });
    return unsubscribe;
  }, [props]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      {photos.map(p => {
        return (
          <PublicPhotoCard
            photo={p}
            album_id={props.match.params.album_id}
            user={props.user}
          />
        );
      })}
      <div>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Add Photo
        </Button>
      </div>
      <AddPhoto
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        user={props.user}
        album_id={props.match.params.album_id}
      />
    </div>
  );
}
