import { useEffect, useState } from "react";
import { Photo as PhotoAlbumPhoto } from "react-photo-album";
import { Photo } from "../types";

const perPage = 10;

function useLoadItems(url: string, query: Record<string, number | string>) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PhotoAlbumPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);

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

        const photos = [
          ...items,
          ...fetchedData.results.map(
            (photo: Photo): PhotoAlbumPhoto => ({
              key: photo.urls.thumb,
              src: photo.urls.thumb,
              images: [
                {
                  src: photo.urls.thumb,
                  width: photo.width,
                  height: photo.height,
                },
              ],
              width: photo.width,
              height: photo.height,
            }),
          ),
        ];
        setItems(photos);
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

  return { loading, items, error, loadMore };
}

export default useLoadItems;
