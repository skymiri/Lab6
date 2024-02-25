const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  const yauzl = require("yauzl-promise");

  return yauzl.open(pathIn, { lazyEntries: true }).then((zipfile) => {
    const ignoreDir = "HiddenDir/";
    const ignoreDirLength = ignoreDir.length;

    const extractEntry = (entry) => {
      const entryPath = entry.fileName;

      if (entryPath.startsWith(ignoreDir)) {
        return;
      }

      const outputPath = path.join(pathOut, entryPath);

      if (/\/$/.test(entryPath)) {
        // Create directory if entry is a directory
        return fs.promises.mkdir(outputPath, { recursive: true });
      } else {
        // Extract file if entry is a file
        return zipfile.openReadStream(entry).then((readStream) => {
          const writeStream = fs.createWriteStream(outputPath);
          readStream.pipe(writeStream);
          return new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
          });
        });
      }
    };

    const extractNextEntry = () => {
      const entry = zipfile.readEntry();

      if (!entry) {
        return zipfile.close();
      }

      return extractEntry(entry).then(extractNextEntry);
    };

    return extractNextEntry();
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
async function readDir(dir) {
  return new promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngFiles = files.filter(
          (file) => path.extname(file).toLowerCase() === ".png"
        );
      }
    });
  });
}

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  var fs = require("fs"),
    PNG = require("pngjs").PNG;

  fs.createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          // invert color
          let gray =
            this.data[idx] * 0.21 +
            this.data[idx + 1] * 0.72 +
            this.data[idx + 2];
          this.data[idx] = gray;
          this.data[idx + 1] = gray;
          this.data[idx + 2] = gray;
        }
      }

      this.pack().pipe(fs.createWriteStream(pathOut));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};

//spin up new thread to read all the png files from given directory and return Promise containing array of each png file path
