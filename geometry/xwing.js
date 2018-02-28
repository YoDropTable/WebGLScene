/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class xwing extends ObjectGroup {
  constructor(gl) {
    super(gl);
    for(let i = 0;i < 4;i++){
        let wingGroup = new ObjectGroup(gl);
        this.group.push(wingGroup);
        let wingTip = new Cone(gl,
            {radius:.1,
                height:1,
                radialDiv: 20,
                tipColor: [100/255,100/255,100/255],
                baseColor: [138/255,138/255,138/255]
            });

        let wingShaft = new PolygonalPrism(gl,{
            topRadius: .05,
            bottomRadius: .05,
            numSides: 3,
            height: .4,
            topColor: [108/255,108/255,108/255],
            bottomColor: [106/255,106/255,106/255]
            });
        let wingBase = new PolygonalPrism(gl,{
            topRadius: .1,
            bottomRadius: .2,
            numSides: 3,
            height: .2,
            topColor: [128/255,128/255,128/255],
            bottomColor: [128/255,128/255,128/255]
            });
        wingGroup.group.push(wingTip);
        mat4.translate(wingTip.coordFrame,wingTip.coordFrame,
            vec3.fromValues(0,-.35,0));
        mat4.rotateX (wingTip.coordFrame, wingTip.coordFrame, 
                glMatrix.toRadian(90));
        wingGroup.group.push(wingShaft);
        mat4.translate(wingShaft.coordFrame,wingShaft.coordFrame,
            vec3.fromValues(0,0,0));
        mat4.rotateX (wingShaft.coordFrame, wingShaft.coordFrame, 
            glMatrix.toRadian(90));
        wingGroup.group.push(wingBase);
        mat4.translate(wingBase.coordFrame,wingBase.coordFrame,
            vec3.fromValues(0,.2,0));
        mat4.rotateX(wingBase.coordFrame,wingBase.coordFrame,
            glMatrix.toRadian(90));
        switch(i){
            case 0:
            mat4.translate(wingGroup.coordFrame,wingGroup.coordFrame,
                vec3.fromValues(-.866,1,.5));
                mat4.rotateZ(wingBase.coordFrame,wingBase.coordFrame,
                    glMatrix.toRadian(30));
            break;
            case 1:
            mat4.translate(wingGroup.coordFrame,wingGroup.coordFrame,
                vec3.fromValues(.866,1,.5));
                mat4.rotateZ(wingBase.coordFrame,wingBase.coordFrame,
                    glMatrix.toRadian(30));
            break;
            case 2:
            mat4.translate(wingGroup.coordFrame,wingGroup.coordFrame,
                vec3.fromValues(-.866,1,-.5));
                mat4.rotateZ(wingBase.coordFrame,wingBase.coordFrame,
                    glMatrix.toRadian(-30));
            break;
            case 3:
            mat4.translate(wingGroup.coordFrame,wingGroup.coordFrame,
                vec3.fromValues(.866,1,-.5));
                mat4.rotateZ(wingBase.coordFrame,wingBase.coordFrame,
                    glMatrix.toRadian(-30));
            break;
            }
        }
        let cockPit = new Sphere(gl, {radius: 0.2, splitDepth: 4,
            northColor: [8/255,8/255,8/255],
            equatorColor: [58/255,58/255,58/255],
            southColor: [108/255,108/255,108/255]});
        this.group.push(cockPit);
        let crossShaft = new PolygonalPrism(gl,{
            topRadius: .1,
            bottomRadius: .1,
            numSides: 3,
            height: 2,
            topColor: [58/255,58/255,58/255],
            bottomColor: [38/255,38/255,38/255]
            });
        this.group.push(crossShaft);
        mat4.translate(crossShaft.coordFrame,crossShaft.coordFrame,
            vec3.fromValues(-.866,1.1,-.5));
        mat4.rotateY(crossShaft.coordFrame,crossShaft.coordFrame,
            glMatrix.toRadian(60));
        let crossShaft2 = new PolygonalPrism(gl,{
            topRadius: .1,
            bottomRadius: .1,
            numSides: 3,
            height: 2,
            topColor: [58/255,58/255,58/255],
            bottomColor: [38/255,38/255,38/255]
            });
        this.group.push(crossShaft2);
        mat4.translate(crossShaft2.coordFrame,crossShaft2.coordFrame,
            vec3.fromValues(.866,1.1,-.5));
        mat4.rotateY(crossShaft2.coordFrame,crossShaft2.coordFrame,
            glMatrix.toRadian(-60));
        let body = new PolygonalPrism(gl,{
            topRadius: .2,
            bottomRadius: .25,
            numSides: 52,
            height: 1.2,
            topColor: [108/255,108/255,108/255],
            bottomColor: [38/255,38/255,38/255]
            });
        this.group.push(body);
        mat4.rotateX(body.coordFrame,body.coordFrame,
            glMatrix.toRadian(90));
        mat4.translate(body.coordFrame,body.coordFrame,
            vec3.fromValues(0,-.125,-1.15));
        let bodyTip = new Cone(gl,
            {radius:.25,
                height:.8,
                radialDiv: 22,
                tipColor: [38/255,38/255,38/255],
                baseColor: [108/255,108/255,108/255]
            });
        this.group.push(bodyTip);
        mat4.rotateX(bodyTip.coordFrame,bodyTip.coordFrame,
            glMatrix.toRadian(90));
        mat4.translate(bodyTip.coordFrame,bodyTip.coordFrame,
            vec3.fromValues(0,-.125,0));

    }
}