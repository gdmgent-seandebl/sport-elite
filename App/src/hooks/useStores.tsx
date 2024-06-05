import { storeContext } from "../components/Context/StoreContext";
import { useContext } from "react";

const useStores = () => useContext(storeContext);

export default useStores;
