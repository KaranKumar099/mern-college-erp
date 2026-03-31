import DataUri from "datauri/parser.js";
import path from "path";

let dataURIChild = new DataUri();

export default (originalName, buffer) => {
  const extension = path.extname(originalName);
  return dataURIChild.format(extension, buffer).content;
};
