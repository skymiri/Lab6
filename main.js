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
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

async function main() {
  await IOhandler.unzip();
  const imgs = await IOhandler.readDir();

  IOhandler.unzip(zipFilePath, pathUnzipped).then(() => IOhandler.readDir());
}
