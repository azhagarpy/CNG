import {  createStore } from "redux";
import rootReducer from "../reducer/rootReducer";

const allStore = createStore(rootReducer);

export default allStore;
