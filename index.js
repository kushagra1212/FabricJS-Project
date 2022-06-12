let canvas = new fabric.Canvas("canvas", {
  width: 1000,
  height: 500,
  selection: false,
});
let viewports = [];
let uploadedImage = null;
let dragable = {
  dragableLeft: false,
  dragableTop: false,
  dragableRight: false,
  dragableBottom: false,
};
const uploadImage = function () {
  let input = document.getElementById("inputTag");
  input.addEventListener("change", selectImageHandler);
};
const selectImageHandler = function () {
  let inputImage = document.querySelector("input[type=file]").files[0];
  if (checkExtension(inputImage.name)) {
    fabric.Image.fromURL(URL.createObjectURL(inputImage), (image) => {
      canvas.clear().renderAll();
      image.scaleToHeight(500);
      image.scaleToWidth(500);
      image.originX = "center";
      image.originY = "center";
      image.left = 500;
      image.top = 250;
      image.selectable = false;
      uploadedImage = image;

      document.getElementById("buttonContent").innerText = "Reupload Image";
      enableClearButton();
      canvas.add(image);
    });
  } else {
    alert(
      "Please Choose image in one of this formats " +
        supportedExtensions.join(", ") +
        "."
    );
  }
};
canvas.on("mouse:wheel", function (options) {
  let delta = options.e.deltaY;
  let presentZoom = canvas.getZoom();
  let newZoom = presentZoom * Math.pow(0.9995, delta);
  let vpt = this.viewportTransform;

  setImageDragableProperty();
  if (newZoom >= presentZoom) {
    newZoom = newZoom < 0.1 ? 0.1 : newZoom;
    viewports.push(vpt);
    canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, newZoom);
  } else {
    newZoom = newZoom > 20 ? 20 : newZoom;
    if (viewports.length > 0) {
      let previousViewport = viewports[viewports.length - 1];
      viewports.pop();
      canvas.setViewportTransform(previousViewport);
    }
  }
});
canvas.on("mouse:down", function (opt) {
  var evt = opt.e;
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on("mouse:move", function (options) {
  if (this.isDragging && viewports.length > 0) {
    var e = options.e;
    var vpt = this.viewportTransform;
    console.log(vpt);
    if (dragable.dragableLeft || dragable.dragableRight)
      vpt[4] += e.clientX - this.lastPosX;
    if (dragable.dragableTop || dragable.dragableRight)
      vpt[5] += e.clientY - this.lastPosY;

    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on("mouse:up", function () {
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});
const disableClearButton = function () {
  let clearBtn = document.getElementById("clearBtn");
  clearBtn.disabled = true;
  clearBtn.classList.remove("clearBtn");
  clearBtn.classList.add("disableClearBtn");
  canvas.add(
    new fabric.Text("Please Add An Image", {
      left: 500,
      top: 250,
      originX: "center",
      originY: "center",
      opacity: 0.5,
      selectable: false,
    })
  );
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
};
disableClearButton();
const enableClearButton = function () {
  let clearBtn = document.getElementById("clearBtn");
  clearBtn.disabled = false;
  clearBtn.classList.remove("disableClearBtn");
  clearBtn.classList.add("clearBtn");
};
const clearCanvas = function () {
  canvas.clear().renderAll();
  document.getElementById("buttonContent").innerText = "Upload Image";
  uploadedImage = null;
  disableClearButton();
};
