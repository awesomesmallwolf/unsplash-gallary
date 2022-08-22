import { createContext } from "react";
import PhotoStore from "./PhotoStore";

export const rootStoreContext = createContext({
  photoStore: new PhotoStore(),
});
