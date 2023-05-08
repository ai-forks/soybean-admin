import auth from "./auth";
import route from "./route";
import management from "./management";
import config from "./config";

export default [...auth, ...route, ...management, ...config];
