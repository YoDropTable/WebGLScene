/**
 * Created by Hans Dulimarta.
 * Student Phil Garza
 */
let canvas
let gl;
let allObjs = [];
let turnLR = 0;
let turnUD = 0;
let roll = 0;

var projUnif;
var projMat, viewMat;

function main() {
  canvas = document.getElementById("my-canvas");

  /* setup window resize listener */
  window.addEventListener('resize', resizeWindow);

  gl = WebGLUtils.create3DContext(canvas, null);
  ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
  .then (prog => {

    /* put all one-time initialization logic here */
    gl.useProgram (prog);
    gl.clearColor (0, 0, 0, 1);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.BACK);

    /* the vertex shader defines TWO attribute vars and ONE uniform var */
    let posAttr = gl.getAttribLocation (prog, "vertexPos");
    let colAttr = gl.getAttribLocation (prog, "vertexCol");
    Object3D.linkShaderAttrib({
      positionAttr: posAttr,
      colorAttr: colAttr
    });
    let modelUnif = gl.getUniformLocation (prog, "modelCF");
    projUnif = gl.getUniformLocation (prog, "projection");
    viewUnif = gl.getUniformLocation (prog, "view");
    Object3D.linkShaderUniform({
      projection: projUnif,
      view: viewUnif,
      model: modelUnif
    });
    gl.enableVertexAttribArray (posAttr);
    gl.enableVertexAttribArray (colAttr);
    projMat = mat4.create();
    gl.uniformMatrix4fv (projUnif, false, projMat);
    viewMat = mat4.lookAt(mat4.create(),
      vec3.fromValues (11, 4, 6),  // eye coord
      vec3.fromValues (0, 0, 1),  // gaze point
      vec3.fromValues (0, 0, 1)   // Z is up
    );
    gl.uniformMatrix4fv (viewUnif, false, viewMat);

    /* recalculate new viewport */
    resizeWindow();

    createObject();

    /* initiate the render request */
    window.requestAnimFrame(drawScene);
  });

  /* Add listener for keys */
  document.addEventListener("keydown", 
            event => {
                switch(event.keyCode){
                  // Keycode W // Forward
                  case 87:
                      mat4.multiply(viewMat, mat4.fromTranslation(mat4.create(), vec3.fromValues(0,0,.5)), viewMat);
                      break;
                  // Keycode S // Move Backward
                  case 83:
                    //at4.translate(viewMat,viewMat,vec3.fromValues(-.1,0,0));
                      mat4.multiply(viewMat, mat4.fromTranslation(mat4.create(), vec3.fromValues(0,0,-.5)), viewMat);
                      break;
                  // Keycode A // Rotate Left
                  case 65:
                        //mat4.rotateY(projMat,projMat,-.02);
                      mat4.multiply(viewMat, mat4.fromYRotation(mat4.create(), glMatrix.toRadian(-5)), viewMat);
                      break;
                  // Keycode D // Rotate Right
                  case 68:
                      mat4.multiply(viewMat, mat4.fromYRotation(mat4.create(), glMatrix.toRadian(5)), viewMat);
                      break;
                  // Keycode Q // Rool Left
                  case 81:
                  mat4.multiply(viewMat, mat4.fromZRotation(mat4.create(), glMatrix.toRadian(-5)), viewMat);
                    break;
                  // Keycode E // Roll Right
                  case 69:
                  mat4.multiply(viewMat, mat4.fromZRotation(mat4.create(), glMatrix.toRadian(5)), viewMat);
                    break;
                  // Keycode R // View Up 
                  case 82:
                  mat4.multiply(viewMat, mat4.fromXRotation(mat4.create(), glMatrix.toRadian(-5)), viewMat);
                    break;
                  // Keycode F // View Down
                  case 70:
                  mat4.multiply(viewMat, mat4.fromXRotation(mat4.create(), glMatrix.toRadian(5)), viewMat);
                    break;
                  case 49:
                    mat4.lookAt(viewMat,vec3.fromValues(6,6,6),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
                    break;
                  case 50:
                  mat4.lookAt(viewMat,vec3.fromValues(-6,6,-6),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
                    break
                  case 51:
                  mat4.lookAt(viewMat,vec3.fromValues(6,6,-6),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
                    break;
                  case 52:
                  mat4.lookAt(viewMat,vec3.fromValues(6,-6,6),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
                    break;
                }
                console.log(event.keyCode);
                window.requestAnimFrame(drawScene);
            });
}

function drawScene() {
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  gl.uniformMatrix4fv(viewUnif,false,viewMat);
  gl.uniformMatrix4fv(projUnif,false,projMat)
  /* in the following three cases we rotate the coordinate frame by 1 degree */
  for (var k = 0; k < allObjs.length; k++)
    allObjs[k].draw(gl);

}

function createObject() {
    var myObj = new Creature(gl)
  mat4.translate(myObj.coordFrame,myObj.coordFrame, vec3.fromValues(1,2,0));
  allObjs.push(myObj);
}

function resizeWindow() {
  let w = window.innerWidth - 16;
  let h = 0.75 * window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  mat4.perspective (projMat, glMatrix.toRadian(60), w/h, 0.05, 20);
  gl.uniformMatrix4fv (projUnif, false, projMat);
  gl.viewport(0, 0, w, h);
  window.requestAnimFrame(drawScene);
}
