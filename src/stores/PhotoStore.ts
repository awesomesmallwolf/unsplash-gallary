import { makeAutoObservable } from "mobx";
import { Photo } from 'react-photo-album'

type ExtendsPhtoAlbumPhoto = Photo & {
  src_full?: string;
};

class PhotoStore {
  photos:ExtendsPhtoAlbumPhoto[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addPhotoItems = (items: ExtendsPhtoAlbumPhoto[]) => {
    this.photos = [...this.photos, ...items];
  };
}

export default PhotoStore;
