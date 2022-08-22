import { useEffect, useState } from "react";
import { Photo as PhotoAlbumPhoto } from "react-photo-album";

import { useStore } from "./use-store";
import { Photo } from "../types";

function useLoadItems(url: string, query: Record<string, number | string>) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const { photoStore } = useStore();
  const { addPhotoItems } = photoStore;
  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const urlSearchParams = new URLSearchParams({
          ...query,
          page: String(page),
          per_page: String(perPage),
          query: "food",
        });
        const urlParams = urlSearchParams.toString();

        let response = await fetch(url + "?" + urlParams, {});
        const fetchedData = await response.json();

        addPhotoItems(
          fetchedData.results.map((photo: Photo) => ({
            key: photo.urls.thumb,
            src: photo.urls.thumb,
            src_full: photo.urls.small,
            images: [
              {
                src: photo.urls.thumb,
                width: photo.width,
                height: photo.height,
                src_full: photo.urls.small,
              },
            ],
            width: photo.width,
            height: photo.height,
          })),
        );
        setLoading(false);
      } catch (err: unknown) {
        setError(err as Error);
      }
    };

    fetchData();
  }, [url, page]);

  function loadMore() {
    setPage((page) => page + 1);
  }

  return { loading, loadMore };
}

export default useLoadItems;
