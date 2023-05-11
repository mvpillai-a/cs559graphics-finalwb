// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import {ObjGrObject} from "../libs/CS559-Framework/loaders.js";

let plaid_tex = new T.TextureLoader().load("../textures/plaid.jpg");

export class GrFisherman extends GrObject {
    constructor(){
        let obj = new T.Object3D();

        plaid_tex.wrapS = plaid_tex.wrapT = T.RepeatWrapping;

        let bodyg = new T.BoxGeometry(.6,1.2,.4);
        let plaid = new T.MeshStandardMaterial({map:plaid_tex});
        let body = new T.Mesh(bodyg,plaid);
        body.position.set(0,.6,0);
        obj.add(body);

        let strapg = new T.BoxGeometry(.1,1.25,.45);
        let jean = new T.MeshStandardMaterial({color:"#A4C0D3",roughness:0.5});
        let strap1 = new T.Mesh(strapg,jean);
        strap1.position.set(-.2,.6,0);
        obj.add(strap1);
        let strap2 = strap1.clone();
        strap2.position.set(.2,.6,0);
        obj.add(strap2);

        let leg1 = new T.Object3D();
        let leg2 = new T.Object3D();
        let thighg = new T.BoxGeometry(.3,.3,.8);
        let thigh1 = new T.Mesh(thighg,jean);
        thigh1.position.set(-.16,.2,.6);
        leg1.add(thigh1);
        let thigh2 = thigh1.clone();
        thigh2.position.set(.16,.2,.6);
        leg2.add(thigh2);
        let calfg = new T.BoxGeometry(.3,.5,.3);
        let calf1 =  new T.Mesh(calfg,jean);
        calf1.position.set(-.16,-.2,.8);
        leg1.add(calf1);
        let calf2 =  calf1.clone();
        calf2.position.set(.16,-.2,.8);
        leg2.add(calf2);
        let shoeg = new T.BoxGeometry(.32,.2,.4);
        let brown = new T.MeshStandardMaterial({roughness: 0.75, color: "#483C32", side:T.DoubleSide});
        let shoe1 = new T.Mesh(shoeg,brown);
        shoe1.position.set(-.16,-.5,.8);
        leg1.add(shoe1);
        let shoe2 = shoe1.clone();
        shoe2.position.set(.16,-.5,.8);
        leg2.add(shoe2);
        leg1.rotateY(-.05);
        leg2.rotateY(.05);
        obj.add(leg1);
        obj.add(leg2);

        let armg = new T.BoxGeometry(.25,.25,.8);
        let arm1 = new T.Mesh(armg,plaid);
        let arm2 = arm1.clone();
        arm1.position.set(-.3,.8,.2);
        arm1.rotation.set(Math.PI/4,Math.PI/8,0);
        obj.add(arm1);
        arm2.position.set(.3,.8,.2);
        arm2.rotation.set(Math.PI/4,-Math.PI/8,0);
        obj.add(arm2);

        let headg = new T.SphereGeometry(.25);
        let skin = new T.MeshStandardMaterial({color:"#EDC8A3"});
        let head = new T.Mesh(headg,skin);
        head.position.set(0,1.5,0);
        head.scale.set(1,1.2,1);
        obj.add(head);
        let hat = new T.Object3D();
        let hatrimg = new T.CircleGeometry(.5);
        let hatrim = new T.Mesh(hatrimg,brown);
        hatrim.rotation.set(Math.PI/2,0,0);
        let hattopg = new T.SphereGeometry(.3,32,16,0,Math.PI);
        let hattop = new T.Mesh(hattopg,brown);
        hattop.rotation.set(-Math.PI/2,0,0);
        hat.add(hattop);
        hat.add(hatrim);
        hat.position.set(0,1.5,0);
        hat.rotation.set(-Math.PI/4,0,0);
        obj.add(hat);

        let fishingpole = new T.Object3D();
        let poleg = new T.CylinderGeometry(.02,.05,3);
        let pole = new T.Mesh(poleg,brown);
        pole.position.set(0,1,1);
        pole.rotateX(Math.PI/4);
        fishingpole.add(pole);
        let sping = new T.CylinderGeometry(.1,.1,.03);
        let spin = new T.Mesh(sping,brown);
        spin.position.set(.04,.2,.2);
        spin.rotation.set(0,0,Math.PI/2);
        fishingpole.add(spin);
        fishingpole.position.set(0,.6,.5);
        fishingpole.rotateY(.1);

        let height = 2;
        let linept = new T.Object3D();
        linept.position.set(0,2.05,2.05);
        let lineg = new T.CylinderGeometry(.02,.02,height);
        let black = new T.MeshStandardMaterial({color:"black"});
        let line = new T.Mesh(lineg,black);
        line.position.set(0,-height/2,0);
        linept.add(line);
        let fish = new T.Object3D();
        let fish_mod = new ObjGrObject({obj:"../objects/Mesh_Fish.obj",name:"fish"});
        fish_mod.objects.forEach(element => {
            element.rotateX(-Math.PI/2);
            element.position.set(0,-.4,0);
            element.scale.set(.01,.01,.01);
            fish.add(element);
        });
        linept.add(fish);
        fishingpole.add(linept);

        obj.add(fishingpole);

        super("Fisherman",obj);
        this.obj = obj;
        this.leg1 = leg1;
        this.leg2 = leg2;
        this.fishingpole = fishingpole;
        this.line = line;
        this.fish = fish;
        this.time = 0;
    }
    stepWorld(delta){
        this.time += delta/1000;
        this.leg1.rotateY(0.001*Math.sin(this.time));
        this.leg2.rotateY(-0.001*Math.sin(this.time));
        this.fishingpole.rotateY(.004*Math.sin(this.time));
        this.line.scale.set(1,Math.min(6*Math.sin(this.time),0),1);
        this.line.position.set(0,Math.min(6*Math.sin(this.time),0),0);
        this.fish.position.set(0,2*Math.min(6*Math.sin(this.time),0),0);
        this.fish.rotateZ(.1*Math.sin(this.time*10));
    }
}

export class GrHorse extends GrObject {
    constructor(paramcol,animate){
        let obj = new T.Object3D();

        let bodyg = new T.CapsuleGeometry(.4,.8,32,32);
        let brown = new T.MeshStandardMaterial({color:paramcol});
        let body = new T.Mesh(bodyg, brown);
        body.position.set(0,1,0);
        body.scale.set(1.2,1,1);
        body.rotation.set(0,0,Math.PI/2);
        obj.add(body);

        let leggeom = new T.CapsuleGeometry(.1,.8);
        let leg1 = new T.Object3D();
        leg1.position.set(.5,.8,.25);
        let legg1 = new T.Mesh(leggeom, brown);
        legg1.position.set(0,-.4,0);
        leg1.add(legg1);
        let leg2 = leg1.clone();
        let leg3 = leg1.clone();
        let leg4 = leg1.clone();
        leg1.rotateZ(-.1);
        leg2.position.set(.5,.8,-.25);
        obj.add(leg2);
        leg3.position.set(-.5,.8,.25);
        obj.add(leg3);
        leg4.position.set(-.5,.8,-.25);
        obj.add(leg4);

        obj.add(leg1);

        let neckg = new T.CapsuleGeometry(.2,.6,32,32);
        let neck = new T.Mesh(neckg,brown);
        neck.position.set(.8,1.5,0);
        neck.scale.set(1.3,1,1);
        neck.rotateZ(-Math.PI/4);
        obj.add(neck);

        let headg = new T.CapsuleGeometry(.2,.3,32,32);
        let head = new T.Mesh(headg,brown);
        head.position.set(1.2,1.7,0);
        head.rotation.set(0,0,Math.PI/3);
        obj.add(head);

        let earg = new T.BoxGeometry(.1,.2,.05);
        let ear1 = new T.Mesh(earg,brown);
        ear1.position.set(1,2,.1);
        obj.add(ear1);
        let ear2 = new T.Mesh(earg,brown);
        ear2.position.set(1,2,-.1);
        obj.add(ear2);

        let maneg = new T.BoxGeometry(1,.2,.1);
        let black = new T.MeshStandardMaterial({color:"black"});
        let mane = new T.Mesh(maneg, black);
        mane.position.set(.6,1.7,0);
        mane.rotation.set(0,0,Math.PI/4);
        obj.add(mane);
        let mane2 = mane.clone();
        mane2.position.set(-1,1,0);
        obj.add(mane2);

        let eyegeom = new T.CylinderGeometry(.05,.05,.4);
        let eye = new T.Mesh(eyegeom,black);
        eye.position.set(1.2,1.75,0);
        eye.rotation.set(Math.PI/2,0,0);
        obj.add(eye);
        
        obj.scale.set(.8,.8,.8);

        super("Horse",obj);
        this.leg1 = leg1;
        this.leg2 = leg2;
        this.leg3 = leg3;
        this.leg4 = leg4;
        this.time = 0;
        this.animate = animate;
    }
    stepWorld(delta){
        this.time += delta/1000;
    }
}

export class GrMovingHorse extends GrObject{
    constructor(paramcol){
        let scene = new T.Object3D();
        let horse = new T.Object3D();
        let obj = new T.Object3D();

        let bodyg = new T.CapsuleGeometry(.4,.8,32,32);
        let brown = new T.MeshStandardMaterial({color:paramcol});
        let body = new T.Mesh(bodyg, brown);
        body.position.set(0,1,0);
        body.scale.set(1.2,1,1);
        body.rotation.set(0,0,Math.PI/2);
        obj.add(body);

        let leggeom = new T.CapsuleGeometry(.1,.8);
        let leg1 = new T.Object3D();
        leg1.position.set(.5,.8,.25);
        let legg1 = new T.Mesh(leggeom, brown);
        legg1.position.set(0,-.4,0);
        leg1.add(legg1);
        let leg2 = leg1.clone();
        let leg3 = leg1.clone();
        let leg4 = leg1.clone();
        leg1.rotateZ(-.1);
        leg2.position.set(.5,.8,-.25);
        obj.add(leg2);
        leg3.position.set(-.5,.8,.25);
        obj.add(leg3);
        leg4.position.set(-.5,.8,-.25);
        obj.add(leg4);

        obj.add(leg1);

        let pov = new T.Object3D();
        pov.rotateY(Math.PI/2);
        let headrot = new T.Object3D();
        headrot.add(pov);
        headrot.position.set(.5,1,0);
        let neckg = new T.CapsuleGeometry(.2,.6,32,32);
        let neck = new T.Mesh(neckg,brown);
        neck.position.set(.3,.5,0);
        neck.scale.set(1.3,1,1);
        neck.rotateZ(-Math.PI/4);
        headrot.add(neck);

        let headg = new T.CapsuleGeometry(.2,.3,32,32);
        let head = new T.Mesh(headg,brown);
        head.position.set(.7,.7,0);
        head.rotation.set(0,0,Math.PI/3);
        headrot.add(head);

        let earg = new T.BoxGeometry(.1,.2,.05);
        let ear1 = new T.Mesh(earg,brown);
        ear1.position.set(.5,1,.1);
        headrot.add(ear1);
        let ear2 = new T.Mesh(earg,brown);
        ear2.position.set(.5,1,-.1);
        headrot.add(ear2);

        let maneg = new T.BoxGeometry(1,.2,.1);
        let black = new T.MeshStandardMaterial({color:"black"});
        let mane = new T.Mesh(maneg, black);
        mane.position.set(.1,.7,0);
        mane.rotation.set(0,0,Math.PI/4);
        headrot.add(mane);
        let mane2 = mane.clone();
        mane2.position.set(-1,1,0);
        obj.add(mane2);

        let eyegeom = new T.CylinderGeometry(.05,.05,.4);
        let eye = new T.Mesh(eyegeom,black);
        eye.position.set(.7,.75,0);
        eye.rotation.set(Math.PI/2,0,0);
        headrot.add(eye);
        obj.add(headrot);
        
        obj.scale.set(.6,.6,.6);
        obj.rotateY(-Math.PI/2);
        horse.add(obj);
        scene.add(horse);
        horse.lookAt(3,0,2);

        let haygeom = new T.BoxGeometry(1,.5,.5);
        let yellow = new T.MeshStandardMaterial({color:"#FFE18F"});
        let hay = new T.Mesh(haygeom, yellow);
        hay.position.set(3.2,0,2.4);
        hay.rotateY(-Math.PI/3);
        scene.add(hay);

        super("MovingHorse",scene);
        this.horse = horse;
        this.leg1 = leg1;
        this.leg2 = leg2;
        this.leg3 = leg3;
        this.leg4 = leg4;
        this.headrot = headrot;
        this.pov = pov;
        this.hay = hay;
        this.time = 0;
        this.state = 0;
        this.eattime = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(.5);
        this.pov.add(this.ridePoint);
        this.rideable = this.ridePoint;
    }
    stepWorld(delta){
        this.time += delta/1000;
        if(this.state==0){
            this.headrot.rotateZ(.01*Math.sin(5*this.time));
            this.leg1.rotateZ(.02*Math.sin(5*this.time));
            this.leg2.rotateZ(-.02*Math.sin(5*this.time));
            this.leg3.rotateZ(-.02*Math.sin(5*this.time));
            this.leg4.rotateZ(.02*Math.sin(5*this.time));
            if(this.horse.position.x <= 2.4){
                this.horse.position.x += .015;
            }
            if(this.horse.position.z <= 1.6){
                this.horse.position.z += .01;
            }
            else{
                this.state = 1;
            }
        }
        if(this.state == 1){
            if(this.headrot.rotation.z > -Math.PI/3){
                this.headrot.rotation.z -= .05;
            }
            else{
                this.headrot.rotateZ(-.01*Math.sin(5*this.time));
                this.hay.scale.x -= .001;
                this.hay.scale.y -= .001;
                this.hay.scale.z -= .001;
                if(this.hay.scale.x < 0){
                    this.state = 2;
                }
            }
        }
        if(this.state == 2){
            if(this.headrot.rotation.z < 0){
                this.headrot.rotation.z += .05;
            }
            else{
                this.state = 3;
            }
        }
        if(this.state == 3){
            if(this.horse.rotation.y < Math.PI){
                this.horse.rotation.y += .05;
            }
            else{
                this.state = 4;
            }
        }
        if(this.state == 4){
            this.headrot.rotateZ(.01*Math.sin(5*this.time));
            this.leg1.rotateZ(.02*Math.sin(5*this.time));
            this.leg2.rotateZ(-.02*Math.sin(5*this.time));
            this.leg3.rotateZ(-.02*Math.sin(5*this.time));
            this.leg4.rotateZ(.02*Math.sin(5*this.time));
            if(this.horse.position.z >= -2.4){
                this.horse.position.z -= .02;
            }
            else{
                this.state = 5;
            }
        }
        if(this.state == 5){
            if(this.horse.rotation.y < 3*Math.PI/2){
                this.horse.rotation.y += .05;
            }
            else{
                this.state = 6;
            }
        }
        if (this.state == 6){
            this.headrot.rotateZ(.01*Math.sin(5*this.time));
            this.leg1.rotateZ(.02*Math.sin(5*this.time));
            this.leg2.rotateZ(-.02*Math.sin(5*this.time));
            this.leg3.rotateZ(-.02*Math.sin(5*this.time));
            this.leg4.rotateZ(.02*Math.sin(5*this.time));
            if(this.horse.position.x >= -3.2){
                this.horse.position.x -= .015;
            }
            else{
                this.state = 7;
            }
        }
        if(this.state == 7){
            if(this.horse.rotation.y < 9*Math.PI/4){
                this.horse.rotation.y += .05;
            }
            else{
                this.state = 8;
            }
        }
        if(this.state == 8){
            this.headrot.rotateZ(.01*Math.sin(5*this.time));
            this.leg1.rotateZ(.02*Math.sin(5*this.time));
            this.leg2.rotateZ(-.02*Math.sin(5*this.time));
            this.leg3.rotateZ(-.02*Math.sin(5*this.time));
            this.leg4.rotateZ(.02*Math.sin(5*this.time));
            if(this.hay.scale.x <= 1){
                this.hay.scale.x += .01;
                this.hay.scale.y += .01;
                this.hay.scale.z += .01;
            }
            if(this.horse.position.x <= 0){
                this.horse.position.x += .015;
            }
            if(this.horse.position.z <= 0){
                this.horse.position.z += .01;
            }
            else{
                this.state = 0;
                this.horse.position.x = 0;
                this.horse.position.z = 0;
                this.horse.lookAt(3,0,2);
            }
        }
        
    }
}
