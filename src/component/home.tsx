import useInfiniteScroll from "react-infinite-scroll-hook";
import PhotoAlbum from "react-photo-album";
import ImageViewer from "react-simple-image-viewer";
import { useCallback, useState } from "react";

import useLoadItems from "../hooks/use-load-items";

export function Home() {
  const {
    loading,
    items: photos,
    error,
    loadMore,
  } = useLoadItems(process.env.REACT_APP_API_URL ?? "", {
    client_id: process.env.REACT_APP_ACCESS_KEY ?? "",
  });

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: true,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
    delayInMs: 1000,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImageIndex(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="App-header">
      <div className="scroll-container" ref={rootRef}>
        <h1>Vector's Portfolio</h1>
        <PhotoAlbum
          layout="masonry"
          photos={photos}
          onClick={(_event, _photo, index) => openImageViewer(index)}
        />
        <div ref={sentryRef}>...Loading</div>
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={photos.map((photo) => photo.src)}
          currentIndex={currentImageIndex}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}
