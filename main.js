const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const { grayScale } = require("../app");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const { unzipFile, readDir } = require("./IOhandler");
async function main() {
  await unzipFile(zipFilePath);

  const files = await readDir(pathUnzipped);

  files.forEach((file) => {
    grayScale(file, pathProcessed);
  });
}

main();
