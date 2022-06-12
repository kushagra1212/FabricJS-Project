const supportedExtensions = ["jpeg", "jpg", "png"];
const checkExtension = function (name) {
  let type = name.split(".");
  if (supportedExtensions.includes(type[type.length - 1])) return true;
  return false;
};
const getCanvasCenterCornerCoordinates = function (points) {
  var invertedMatrix = fabric.util.invertTransform(canvas.viewportTransform);
  var transformedP = fabric.util.transformPoint(points, invertedMatrix);
  return transformedP;
};
const setDragable = function (
  canvasBottomCornerCoordinates,
  canvasTopCornerCoordinates,
  canvasRightCornerCoordinates,
  canvasLeftCornerCoordinates
) {
  dragable.dragableBottom =
    canvasBottomCornerCoordinates.y <
    (canvasBottomCornerCoordinates.y - canvasTopCornerCoordinates.y) / 2 +
      uploadedImage.height / 2
      ? true
      : false;

  dragable.dragableTop =
    canvasTopCornerCoordinates.y >
    (canvasBottomCornerCoordinates.y - canvasTopCornerCoordinates.y) / 2 -
      uploadedImage.height / 2
      ? true
      : false;

  dragable.dragableRight =
    canvasRightCornerCoordinates.x <
    (canvasRightCornerCoordinates.x - canvasLeftCornerCoordinates.x) / 2 +
      uploadedImage.width / 2
      ? true
      : false;
  dragable.dragableLeft =
    canvasLeftCornerCoordinates.x >
    (canvasRightCornerCoordinates.x - canvasLeftCornerCoordinates.x) / 2 -
      uploadedImage.width / 2
      ? true
      : false;
};
const setImageDragableProperty = function () {
  let canvasBottomCornerCoordinates = getCanvasCenterCornerCoordinates({
    x: canvas.width / 2,
    y: canvas.height,
  });
  let canvasTopCornerCoordinates = getCanvasCenterCornerCoordinates({
    x: canvas.width / 2,
    y: 0,
  });
  let canvasRightCornerCoordinates = getCanvasCenterCornerCoordinates({
    x: canvas.width,
    y: canvas.height / 2,
  });
  let canvasLeftCornerCoordinates = getCanvasCenterCornerCoordinates({
    x: 0,
    y: canvas.height / 2,
  });
  setDragable(
    canvasBottomCornerCoordinates,
    canvasTopCornerCoordinates,
    canvasRightCornerCoordinates,
    canvasLeftCornerCoordinates
  );
};
