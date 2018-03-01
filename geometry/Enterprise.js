/**
 * Created by Hans Dulimarta on 2/15/18.
 */
class Enterprise extends ObjectGroup {
    constructor(gl) {
        super(gl);

        /* create body */
        let body = new ObjectGroup(gl);
        //push to group
        this.group.push(body);

        let bodyCyl = new PolygonalPrism(gl, {
            topRadius: 0.5, bottomRadius: 0.06,
            numSides: 20, height: 5,
            topColor: [192/255,192/255,192/255],
            bottomColor: [192/255,192/255,192/255]
        });
        //horizontal body
        mat4.rotateX (body.coordFrame, body.coordFrame, glMatrix.toRadian(-90));
        //push to body group
        body.group.push(bodyCyl);

        //front sphere part of the body
        let bodySphere = new Sphere(gl, {
            radius: 0.45,
            splitDepth: 4,
            northColor: [255/255,165/255,0/255],
            equatorColor: [255/255,165/255,0/255],
            southColor: [255/255,165/255,0/255]
        });
        //place at end of the body
        mat4.translate(bodySphere.coordFrame, bodySphere.coordFrame,
                   vec3.fromValues(0.0, 0.0, 5));
        //push to body group
        body.group.push(bodySphere);

        //rounded back of body
        //sphere part of the engine
        let bodyBack = new Sphere(gl, {
            radius: 0.27,
            splitDepth: 4,
            northColor: [192/255,192/255,192/255],
            equatorColor: [192/255,192/255,192/255],
            southColor: [192/255,192/255,192/255]
        });
        mat4.translate(bodyBack.coordFrame, bodyBack.coordFrame,
            vec3.fromValues(0.0, 0.0, .04));
        body.group.push(bodyBack);


        this.group.push(body);

        /* create 2 engines */
        for(var i = 0; i < 2; i++) {
            //group for engine pieces
            let engine = new ObjectGroup(gl);
            //push to group
            this.group.push(body);

            let engineShaft = new PolygonalPrism(gl, {
                topRadius: 0.3, bottomRadius: 0.01,
                numSides: 20, height: 3.5,
                topColor: [192/255,192/255,192/255],
                bottomColor: [192/255,192/255,192/255]
            });
            //make engine horizontal
            mat4.rotateX(engineShaft.coordFrame, engineShaft.coordFrame, glMatrix.toRadian(-90));
            //push to body group
            engine.group.push(engineShaft);

            //sphere part of the engine
            let engineTip = new Sphere(gl, {
                radius: 0.27,
                splitDepth: 4,
                northColor: [255/255,69/255,0/255],
                equatorColor: [255/255,69/255,0/255],
                southColor: [255/255,69/255,0/255]
            });
            //place at end of engine shaft
            mat4.translate(engineTip.coordFrame, engineTip.coordFrame,
                vec3.fromValues(0.0, 3.55, 0.0));
            //push to part to engine group
            engine.group.push(engineTip);

            //back of engine
            let engineBack = new Cone(gl, {
                radius: 0.155,
                height: 0.5,
                tipColor: [255/255,0/255,0/255],
                baseColor: [0/255,191/255,255/255]
            });
            //place at back of engine
            mat4.translate(engineBack.coordFrame, engineBack.coordFrame,
                vec3.fromValues(0.0, 0, 0.0));
            //rotate to look cool
            mat4.rotateX (engineBack.coordFrame, engineBack.coordFrame, glMatrix.toRadian(90));
            //push to part to engine group
            engine.group.push(engineBack);

            //create attachment
            let engineAttach = new PolygonalPrism(gl, {
                topRadius: 0.08, bottomRadius: 0.15,
                numSides: 4, height: 2.5,
                topColor: [130/255,130/255,130/255],
                bottomColor: [130/255,130/255,130/255]
            });
            //push to inner group
            engine.group.push(engineAttach);

            switch(i){
                //right engine
                case 0:
                    //move to inner engine area
                    mat4.translate(engineAttach.coordFrame, engineAttach.coordFrame,
                        vec3.fromValues(0.0, 2.5, 0));
                    //rotate accordingly
                    mat4.rotateY (engineAttach.coordFrame, engineAttach.coordFrame, glMatrix.toRadian(230));

                    //move entire group based on which engine
                    mat4.translate(engine.coordFrame, engine.coordFrame,
                        vec3.fromValues(2, -1.0, 1.8));

                    // mat4.rotateY (engine.coordFrame, engine.coordFrame, glMatrix.toRadian(180));

                    break;
                //left engine
                case 1:
                    //move to inner engine area
                    mat4.translate(engineAttach.coordFrame, engineAttach.coordFrame,
                        vec3.fromValues(0.0, 2.5, 0));
                    //rotate accordingly
                    mat4.rotateY (engineAttach.coordFrame, engineAttach.coordFrame, glMatrix.toRadian(-230));

                    //move entire group based on which engine
                    mat4.translate(engine.coordFrame, engine.coordFrame,
                        vec3.fromValues(-2, -1.0, 1.8));
                    break;
            }

            //push to outer group
            this.group.push(engine);
        }

        //connect ship head to body
        let connector = new PolygonalPrism(gl, {
            topRadius: 0.3,
            bottomRadius: 0.06,
            numSides: 4,
            height: 1.8,
            topColor: [192/255,192/255,192/255],
            bottomColor: [192/255,192/255,192/255]
        });
        mat4.translate(connector.coordFrame, connector.coordFrame,
            vec3.fromValues(0.0, 4.0, 0));
        mat4.rotateX (connector.coordFrame, connector.coordFrame, glMatrix.toRadian(-45));
        this.group.push(connector);

        let shipHead = new ObjectGroup(gl);
        this.group.push(shipHead);

        /* OG CODE */
        let innerTop = new PolygonalPrism(gl, {
                topRadius: 1, bottomRadius: 4,
                numSides: 50, height: .5,
            topColor: [130/255,130/255,130/255],
            bottomColor: [130/255,130/255,130/255]
            });
        shipHead.group.push(innerTop);

        let outer = new Torus(gl, {
           majorRadius: 2.5,
           minorRadius: .05,
            topColor: [220/255,220/255,220/255],
            bottomColor: [220/255,220/255,220/255]

        });
        shipHead.group.push(outer);


        let innerBottom = new PolygonalPrism(gl, {
            topRadius: 1, bottomRadius: 4,
            numSides: 50, height: .5,
            topColor: [130/255,130/255,130/255],
            bottomColor: [130/255,130/255,130/255]
        });
        //rotate to be bottom
        mat4.rotateX (innerBottom.coordFrame, innerBottom.coordFrame, glMatrix.toRadian(180));
        shipHead.group.push(innerBottom);


        //move ship head to correct place
        mat4.translate(shipHead.coordFrame, shipHead.coordFrame,
            vec3.fromValues(0, 6, 1.5));
    }
}