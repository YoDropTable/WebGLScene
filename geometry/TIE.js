/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class TIE extends ObjectGroup {
  constructor(gl) {
    super(gl);
    let myColor = vec3.fromValues(128/255,128/255,128/255);
    for(var i =0;i<10;i++){
        let wingL = new PolygonalPrism(gl, {
            topRadius: .1, bottomRadius: .1,
            numSides: 4, height: 1.0, topColor: myColor,
            bottomColor: myColor
        });
        let wingR = new PolygonalPrism(gl, {
                topRadius: .1, bottomRadius: .1,
                numSides: 4 , height: 1.0, topColor: myColor,
                bottomColor: myColor
        });
        mat4.translate(wingL.coordFrame, wingL.coordFrame,
            vec3.fromValues(-0.5, i/10, 0))
        this.group.push(wingL);
        mat4.translate(wingR.coordFrame, wingR.coordFrame,
            vec3.fromValues(0.5, i/10, 0))
        this.group.push(wingR);
    }
    let torsoColor = vec3.fromValues(108/255,108/255,108/255);
    let torso = new PolygonalPrism(gl, {
      topRadius: 0.1, bottomRadius: 0.1,
      height: 1, numSides: 50,
      topColor: torsoColor,
      bottomColor: torsoColor
    });
    mat4.rotateY(torso.coordFrame, torso.coordFrame, glMatrix.toRadian(90));
    /* the following YZ translation will be carried out w.r.t the ROTATED frame
     * and not to the "original" frame of this creature */
    mat4.translate(torso.coordFrame, torso.coordFrame,
        vec3.fromValues(-.5,.5, -.5));
    this.group.push(torso);

    /* build the head, ears, and eyes as a new group */
    let headColor = vec3.fromValues(118/255,118/255,118/255);
    //optional: northColor, equatorColor, southColor
    let head = new Sphere(gl, {radius: 0.2, splitDepth: 4,
        northColor: myColor,
        equatorColor: headColor,
        southColor: myColor
    });
    mat4.translate(head.coordFrame, head.coordFrame,
        vec3.fromValues(0,.5, .5));
    this.group.push(head);
  }
}