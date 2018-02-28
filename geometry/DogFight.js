/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class DogFight extends ObjectGroup {
  constructor(gl,value) {
    super(gl);
    let tmpMat = mat4.create();
    switch(value){
      case 1:
        var myTarget = new TIE(gl);
        mat4.translate(myTarget.coordFrame,myTarget.coordFrame,
            vec3.fromValues(-1,0,0));
        var myAttack = new xwing(gl);
        mat4.translate(myAttack.coordFrame,myAttack.coordFrame,
          vec3.fromValues(0,4,0));
        var myAttack2 = new xwing(gl);
        mat4.translate(myAttack2.coordFrame,myAttack2.coordFrame,
          vec3.fromValues(-2.5,4,1));
        this.group.push(myTarget);
        this.group.push(myAttack);
        this.group.push(myAttack2);
        for(var i = 0;i<4;i++){
          var laser = new PolygonalPrism(gl, {
            topRadius: .05, bottomRadius: .05,
            numSides: 20 , height: 1.0, topColor: [.75,0,0],
            bottomColor: [1,0,0]
          });
          var randX = Math.random() * -1;
          var randY = Math.random() * 2;
          mat4.rotateX(laser.coordFrame,laser.coordFrame,
            glMatrix.toRadian(90));
          switch(i){
            case 0:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.75));
            break;
            case 1:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.5));
            break;
            case 2:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-3));
            break;
            case 3:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2));
            break;
          }
          this.group.push(laser);
        }
        break;
      case 2:
        var myTarget = new xwing(gl);
        mat4.translate(myTarget.coordFrame,myTarget.coordFrame,
            vec3.fromValues(0,-2,0));
        var myAttack = new TIE(gl);
        mat4.translate(myAttack.coordFrame,myAttack.coordFrame,
          vec3.fromValues(1,4,0));
          var myAttack2 = new TIE(gl);
        mat4.translate(myAttack2.coordFrame,myAttack2.coordFrame,
            vec3.fromValues(-1,4,-2));
        this.group.push(myTarget);
        this.group.push(myAttack);
        this.group.push(myAttack2);
        for(var i = 0;i<4;i++){
          var laser = new PolygonalPrism(gl, {
            topRadius: .05, bottomRadius: .05,
            numSides: 20 , height: 1.0, topColor: [.75,0,0],
            bottomColor: [1,0,0]
          });
          var randX = Math.random() * -1;
          var randY = Math.random() * 2;
          mat4.rotateX(laser.coordFrame,laser.coordFrame,
            glMatrix.toRadian(90));
          switch(i){
            case 0:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.75));
            break;
            case 1:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.5));
            break;
            case 2:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-3));
            break;
            case 3:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2));
            break;
          }
          this.group.push(laser);
        }
        break;
      case 3:
      var myTarget = new xwing(gl);
        mat4.translate(myTarget.coordFrame,myTarget.coordFrame,
            vec3.fromValues(0,-2,0));
        var myAttack = new TIE(gl);
        mat4.translate(myAttack.coordFrame,myAttack.coordFrame,
          vec3.fromValues(1,4,0));
        this.group.push(myTarget);
        this.group.push(myAttack);
        for(var i = 0;i<4;i++){
          var laser = new PolygonalPrism(gl, {
            topRadius: .05, bottomRadius: .05,
            numSides: 20 , height: 1.0, topColor: [.75,0,0],
            bottomColor: [1,0,0]
          });
          var randX = Math.random() * -1;
          var randY = Math.random() * 2;
          mat4.rotateX(laser.coordFrame,laser.coordFrame,
            glMatrix.toRadian(90));
          switch(i){
            case 0:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.75));
            break;
            case 1:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.5));
            break;
            case 2:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-3));
            break;
            case 3:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2));
            break;
          }
          this.group.push(laser);
        }
      break;
      case 4:
      var myTarget = new TIE(gl);
      mat4.translate(myTarget.coordFrame,myTarget.coordFrame,
          vec3.fromValues(0,0,0));
      var myAttack = new xwing(gl);
      mat4.translate(myAttack.coordFrame,myAttack.coordFrame,
        vec3.fromValues(0,4,.5));
      this.group.push(myTarget);
       this.group.push(myAttack);
       for(var i = 0;i<4;i++){
        var laser = new PolygonalPrism(gl, {
          topRadius: .05, bottomRadius: .05,
          numSides: 20 , height: 1.0, topColor: [.75,0,0],
          bottomColor: [1,0,0]
        });
        var randX = Math.random() * -1;
          var randY = Math.random() * 2;
          mat4.rotateX(laser.coordFrame,laser.coordFrame,
            glMatrix.toRadian(90));
          switch(i){
            case 0:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.75));
            break;
            case 1:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2.5));
            break;
            case 2:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-3));
            break;
            case 3:
            mat4.translate(laser.coordFrame,laser.coordFrame,
              vec3.fromValues(randX,randY,-2));
            break;
          }
        this.group.push(laser);
      }
          break;

    }
  }
}