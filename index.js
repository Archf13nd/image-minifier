import path from "path";

import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

// All valid arguments
const options = {
  inputDir: null,
  outputDir: null,
  label: null,
};

// Grabs value from argument. --option=value returns value (type string)
const getValue = (argument) => {
  const i = argument.indexOf("=") + 1;
  return argument.slice(i, argument.length);
};

// Grabs flag from argument. --option=value returns option
const getFlag = (argument) => {
  const p1 = 2;
  const p2 = argument.indexOf("=");
  return argument.slice(p1, p2);
};

// Traverses arguments given and if valid stores value in options object
process.argv.forEach((e, i) => {
  const flag = getFlag(e);
  const value = getValue(e);
  //   Ignores first two arguments and checks if option is valid
  if (!(i < 2) && options.hasOwnProperty(flag)) {
    options[flag] = value;
  }
});

const minifyImage = async (options) => {
  const files = await imagemin(
    [`${path.resolve(options.inputDir)}/*.{jpg,png}`],
    {
      destination: path.resolve(
        options.inputDir,
        "..",
        `${"build" || options.label}`
      ),
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    }
  );
};

minifyImage(options);
