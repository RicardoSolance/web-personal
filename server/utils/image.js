const getImagePath = (file) => {
  const filePath = file.path;
  const fileSplit = filePath.slice(8).replace("\\", "/"); //el \\g remplaza selecciona el slash \ invertido

  return fileSplit;
};

module.exports = { getImagePath };
