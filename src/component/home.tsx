// import useInfiniteScroll from "react-infinite-scroll-hook";
import PhotoAlbum from "react-photo-album";
import ImageViewer from "react-simple-image-viewer";
import { useCallback, useRef, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { fromEvent } from "rxjs";

import { useStore } from "../hooks/use-store";
import useLoadItems from "../hooks/use-load-items";

export const Home: React.FC = observer(() => {
  const { photoStore } = useStore();
  const { photos } = photoStore;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { loading, loadMore } = useLoadItems(process.env.REACT_APP_API_URL ?? "", {
    client_id: process.env.REACT_APP_ACCESS_KEY ?? "",
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

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const scroll$ = fromEvent(scrollContainerRef.current, "scroll");

    const subscription = scroll$.subscribe(() => {
      if (!scrollContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

      if (scrollTop === scrollHeight - clientHeight) {
        loadMore();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App-header">
      <div className="scroll-container" ref={scrollContainerRef}>
        <h1>Vector's Portfolio</h1>
        <PhotoAlbum
          layout="masonry"
          photos={photos}
          onClick={(_event, _photo, index) => openImageViewer(index)}
        />
        {loading && <div>...Loading</div>}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={photos.map((photo) => photo.src_full ?? " ")}
          currentIndex={currentImageIndex}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
});
