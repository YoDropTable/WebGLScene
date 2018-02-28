/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class Squad extends ObjectGroup {
  constructor(gl,value) {
    super(gl);
    let tmpMat = mat4.create();
    switch(value){
      case 1:
      var j = -4;
      var updown = .25;
      for(var i = -2;i < 3; i++){
        var ship = new TIE(gl);
        mat4.translate(ship.coordFrame,ship.coordFrame,
          vec3.fromValues(i,j,updown));
        this.group.push(ship);
        if(i >= 0){
          j += 2;
        }else{
          j -= 2;
        }
        updown = updown * -1;
      }
        break;
      case 2:
      var j = -4;
      var updown = .25;
      for(var i = -2;i < 3; i++){
        var ship = new xwing(gl);
        mat4.translate(ship.coordFrame,ship.coordFrame,
          vec3.fromValues(i,j,updown));
        this.group.push(ship);
        if(i >= 0){
          j += 2;
        }else{
          j -= 2;
        }
        updown = updown * -1;
      }
        break;
    }
  }
}