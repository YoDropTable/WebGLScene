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
      vec3.fromValues (25, 25, 25),  // eye coord
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
                    mat4.lookAt(viewMat,vec3.fromValues(-6,0,0),vec3.fromValues(1,2,0),vec3.fromValues(0,0,1));
                    break;
                  case 50:
                  mat4.lookAt(viewMat,vec3.fromValues(6,0,0),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
                    break
                  case 51:
                  mat4.lookAt(viewMat,vec3.fromValues(0,6,0),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
                    break;
                  case 52:
                  mat4.lookAt(viewMat,vec3.fromValues(0,-6,0),vec3.fromValues(0,0,0),vec3.fromValues(0,0,1));
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
  for(let i = 0;i < 50; i++){
    var myRand = (Math.floor((Math.random() * 100)) % 2) +1;
    var randX = (Math.floor((Math.random() * 100)) % 50) +1;
    var randY = (Math.floor((Math.random() * 100)) % 50) +1;
    var randZ = (Math.floor((Math.random() * 100)) % 50) +1;
    var ranAngle = (Math.floor((Math.random() * 100)) % 30) +1;
    switch(myRand){
      case 1:
      var myRand2 =  (Math.floor((Math.random() * 100)) % 2) +1;
        var myObj = new Squad(gl,myRand2);
        mat4.translate(myObj.coordFrame,myObj.coordFrame,
          vec3.fromValues(randX,randY,randZ));
        mat4.rotateX(myObj.coordFrame,myObj.coordFrame,
            glMatrix.toRadian(ranAngle));
        allObjs.push(myObj);
        break;
      case 2:
      var myRand2 =  (Math.floor((Math.random() * 100)) % 4) +1;
        var myObj = new DogFight(gl,myRand2);
        mat4.translate(myObj.coordFrame,myObj.coordFrame,
          vec3.fromValues(randX,randY,randZ));
        mat4.rotateX(myObj.coordFrame,myObj.coordFrame,
            glMatrix.toRadian(ranAngle));
        allObjs.push(myObj);
        break;
    }
  }
  for(let x = 0;x<50;x+=10){
    for(let y = 0;y<50;y+=10){
      for(let z = 0;z<50;z+=10){
        let star = new Sphere(gl, {radius: 0.01, splitDepth: 4,
          northColor: [1,1,1],
          equatorColor: [1,1,1],
          southColor: [1,1,1]
          });
        mat4.translate(star.coordFrame,star.coordFrame,vec3.fromValues(x,y,z));
        console.log(x,y,z);
        allObjs.push(star);
      }
    }   
  } 

 //et myObj = new DogFight(gl,1);
 //allObjs.push(myObj);
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
