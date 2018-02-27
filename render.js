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
      vec3.fromValues (11, 3, 6),  // eye coord
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
                      mat4.translate(viewMat,viewMat,vec3.fromValues(.1,0,0))
                      break;
                  // Keycode S // Move Backward
                  case 83:
                    mat4.translate(viewMat,viewMat,vec3.fromValues(-.1,0,0));
                    break;
                  // Keycode A // Rotate Left
                  case 65:
                        mat4.rotateY(projMat,projMat,-.02);
                        break;
                  // Keycode D // Rotate Right
                  case 68:
                      mat4.rotateY(projMat,projMat,.02);
                      break;
                  // Keycode Q // Rool Left
                  case 81:
                      mat4.rotateX(projMat,projMat,.02);
                    break;
                  // Keycode E // Roll Right
                  case 69:
                    mat4.rotateX(projMat,projMat,-.02);
                    break;
                  // Keycode R // View Up 
                  case 82:
                    mat4.rotateZ(projMat,projMat,.02);
                    break;
                  // Keycode F // View Down
                  case 70:
                    mat4.rotateZ(projMat,projMat,-.02);
                    break;
                }
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
 
  let obj = new PolygonalPrism(gl,
      {
        topRadius: 0.5,
        bottomRadius: 0.5,
        numSides: 8,
        height: 1,
        //topColor: vec3.fromValues(1,0,0),
        //bottomColor: vec3.fromValues(1,1,1)
      });
  let cone = new Cone(gl, {
    radius: 0.4,
    height: 1.2
  }); 
  //let stuff = new Sphere(gl,1,3);
  for(i = 0; i< 50;i++){
    for(j =0; j < 50;j++){
      var myRand = Math.floor(Math.random() * 2);
      if(myRand < 1){
        var myObj = new Cone(gl,{
          radius: 0.4,
          height: 1.2
        })
      }
      else{
        var myObj = new PolygonalPrism(gl,
          {
            topRadius: 0.5,
            bottomRadius: 0.5,
            numSides: 8,
            height: 1,
            //topColor: vec3.fromValues(1,0,0),
            //bottomColor: vec3.fromValues(1,1,1)
          });
      }
      mat4.translate(myObj.coordFrame,myObj.coordFrame, vec3.fromValues(i,j,0));
      allObjs.push(myObj);
   }
  }
  //mat4.translate (cone.coordFrame, cone.coordFrame, vec3.fromValues(3, 0, 0));
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
