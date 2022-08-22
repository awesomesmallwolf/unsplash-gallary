import { useContext } from "react";
import { rootStoreContext } from "../stores";

export const useStore = () => useContext(rootStoreContext);
