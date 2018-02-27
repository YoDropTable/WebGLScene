/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class Creature extends ObjectGroup {
  constructor(gl) {
    super(gl);

    for (var k = 0; k < 4; k++) {
         let leg = new PolygonalPrism(gl, {
           topRadius: 0.05, bottomRadius: 0.06,
           numSides: 20, height: 1.0
         });
         switch (k) {
           case 0:
             mat4.translate(leg.coordFrame, leg.coordFrame,
                 vec3.fromValues(0.2, 0.75, 0));
             break;
           case 1:
             mat4.translate(leg.coordFrame, leg.coordFrame,
                 vec3.fromValues(-0.2, 0.75, 0));
             break;
           case 2:
             mat4.translate(leg.coordFrame, leg.coordFrame,
                 vec3.fromValues(0.2, -0.75, 0));
             break;
           case 3:
             mat4.translate(leg.coordFrame, leg.coordFrame,
                 vec3.fromValues(-0.2, -0.75, 0));
             break;
         }
      this.group.push(leg);
    }

    let torso = new PolygonalPrism(gl, {
      topRadius: 0.3, bottomRadius: 0.3,
      height: 2, numSides: 30
    });
    mat4.rotateX(torso.coordFrame, torso.coordFrame, glMatrix.toRadian(90));
    /* the following YZ translation will be carried out w.r.t the ROTATED frame
     * and not to the "original" frame of this creature */
    mat4.translate(torso.coordFrame, torso.coordFrame,
        vec3.fromValues(0, 1, -1));
    this.group.push(torso);

    let tail = new Cone(gl, {radius: 0.05, height: 0.4});
    mat4.rotateX (tail.coordFrame, tail.coordFrame, glMatrix.toRadian(90));
    mat4.translate (tail.coordFrame, tail.coordFrame,
        vec3.fromValues (0, 1, 1));
    let tailShear = mat4.create(); // identity matrix
    tailShear[9] = Math.tan( glMatrix.toRadian(-45));
    mat4.multiply (tail.coordFrame, tail.coordFrame, tailShear);
    this.group.push(tail);

    let neck = new Cone(gl, {radius: 0.1, height: 0.2});
    mat4.rotateX (neck.coordFrame, neck.coordFrame, glMatrix.toRadian(-90));
    mat4.translate (neck.coordFrame, neck.coordFrame,
        vec3.fromValues (0, -1, 1));
    let neckShear = mat4.create(); // identity matrix
    neckShear[9] = Math.tan( glMatrix.toRadian(-45));
    mat4.multiply (neck.coordFrame, neck.coordFrame, neckShear);
    this.group.push(neck);

    /* build the head, ears, and eyes as a new group */

    let headGroup = new ObjectGroup(gl);
    this.group.push (headGroup);

    let head = new Sphere(gl, {radius: 0.2, splitDepth: 4});
    headGroup.group.push (head);
    let leftEar = new Cone(gl, {radius: 0.05, height: 0.1});
    mat4.rotateX (leftEar.coordFrame, leftEar.coordFrame, glMatrix.toRadian(30));
    mat4.translate (leftEar.coordFrame, leftEar.coordFrame,
        vec3.fromValues(0, 0, 0.19));

    headGroup.group.push (leftEar);

    mat4.rotateZ (headGroup.coordFrame, headGroup.coordFrame,
        glMatrix.toRadian(90));
    mat4.translate (headGroup.coordFrame, headGroup.coordFrame,
        vec3.fromValues (1.25, 0, 1.25));
  }
}