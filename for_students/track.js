// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { DoubleSide } from "../libs/CS559-Three/build/three.module.js";
import { GrHorse } from "./living.js";

let wooden = new T.TextureLoader().load("../textures/darkwood.jpeg");
let land = new T.TextureLoader().load("../textures/land.jpg");

export class GrTrack extends GrObject {
    constructor(context) {
        let obj = new T.Object3D();

        let radius = 6;
        let width = 1;
        let track_geom = new T.RingGeometry(radius - width, radius + width, 50, 3);
        let track_mat = new T.MeshStandardMaterial({side: T.DoubleSide, color: "#564731", roughness: 1.0, bumpMap:land});
        let track_mesh = new T.Mesh(track_geom, track_mat);
        track_mesh.rotateX(Math.PI/2);
        track_mesh.position.set(3,0.1,-10);
        obj.add(track_mesh);

        super("Track",obj);
        this.x = 3;
        this.z = -10;
    }
    eval(u) {
        let p = u * 2 * Math.PI;
        return [3+6*Math.cos(p),0,-10+6*Math.sin(p),];
    }
    tangent(u) {
        let p = u * 2 * Math.PI;
        return [Math.sin(p), 0, -Math.cos(p)];
    }
}

export class GrCart extends GrObject {
    constructor(track, params = {}) {
      let obj = new T.Object3D();
      let cart = new T.Object3D();

      let base_geom = new T.BoxGeometry(2,0.05,1);
        let wood_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wooden, side:DoubleSide});
        let base = new T.Mesh(base_geom, wood_mat);
        base.position.set(0,0.4,0);
        cart.add(base);

        let spin1 = new T.Object3D();
        spin1.position.set(0.5,0.3,0);
        cart.add(spin1);
        let spin2 = new T.Object3D();
        spin2.position.set(-0.5,0.3,0);
        cart.add(spin2);

        let wheel_geom = new T.TorusGeometry(0.25,0.05);
        let wheel = new T.Mesh(wheel_geom,wood_mat);
        let spoke_geom = new T.CylinderGeometry(0.25,0.25,0.05,16);
        let wire = new T.MeshStandardMaterial({color:"white",wireframe:true,map: wooden});
        let spoke = new T.Mesh(spoke_geom,wire);
        spoke.rotateX(Math.PI/2);
        wheel.add(spoke);
        let wheel2 = wheel.clone();
        let wheel3 = wheel.clone();
        let wheel4 = wheel.clone();
        wheel.position.z = 0.5;
        wheel2.position.z = 0.5;
        wheel3.position.z = -0.5;
        wheel4.position.z = -0.5;
        spin1.add(wheel);
        spin2.add(wheel2);
        spin1.add(wheel3);
        spin2.add(wheel4);

        let axle_geom = new T.BoxGeometry(0.05,0.05,1);
        let axle1 = new T.Mesh(axle_geom,wood_mat);
        let axle2 = axle1.clone();
        spin1.add(axle1);
        spin2.add(axle2);

        let box_geom = new T.BoxGeometry(0.7,0.5,1);
        let box = new T.Mesh(box_geom,wood_mat);
        box.position.set(-0.6,0.65,0);
        cart.add(box);
        
        let door_geom = new T.BoxGeometry(0.1,0.5,0.3);
        let black = new T.MeshStandardMaterial({roughness:0.75, color:"black"});
        let door = new T.Mesh(door_geom,black);
        door.position.set(-0.25,0.65,0);
        cart.add(door);

        let curve_geom = new T.CylinderGeometry(0.5,0.5,0.7,32,1,false,0,Math.PI);
        let curve = new T.Mesh(curve_geom,wood_mat);
        curve.position.set(-0.6,0.9,0);
        curve.rotateZ(Math.PI/2);
        cart.add(curve);

        let side_geom = new T.BoxGeometry(1.2,0.3,0.05);
        let side = new T.Mesh(side_geom,wood_mat);
        let side2 = side.clone();
        side.position.set(0.3,0.55,0.4);
        side2.position.set(0.3,0.55,-0.4);
        cart.add(side);
        cart.add(side2);

        let roof_geom = new T.CylinderGeometry(0.5,0.5,1.1,32,1,true,0,Math.PI);
        let roof = new T.Mesh(roof_geom,wood_mat);
        roof.position.set(0.3,0.9,0);
        roof.rotateZ(Math.PI/2);
        cart.add(roof);

        let beam_geom = new T.BoxGeometry(0.05,0.05,1);
        let beam = new T.Mesh(beam_geom,wood_mat);
        beam.position.set(0.8,0.925,0);
        cart.add(beam);

        let col_geom = new T.BoxGeometry(0.05,0.5,0.05);
        let col1 = new T.Mesh(col_geom,wood_mat);
        let col2 = col1.clone();
        let col3 = col1.clone();
        col1.position.set(0.8,1.15,0);
        col2.position.set(0.8,0.8,0.4);
        col3.position.set(0.8,0.8,-0.4);
        cart.add(col1);
        cart.add(col2);
        cart.add(col3);

        let handle_geom = new T.BoxGeometry(0.5,0.05,0.05);
        let handle1 = new T.Mesh(handle_geom,wood_mat);
        let handle2 = handle1.clone();
        handle1.position.set(1.1,0.45,0.4);
        handle2.position.set(1.1,0.45,-0.4);
        cart.add(handle1);
        cart.add(handle2);

        /////
        let horse = new T.Object3D();

        let bodyg = new T.CapsuleGeometry(.4,.8,32,32);
        let brown = new T.MeshStandardMaterial({color:"#925920"});
        let body = new T.Mesh(bodyg, brown);
        body.position.set(0,1,0);
        body.scale.set(1.2,1,1);
        body.rotation.set(0,0,Math.PI/2);
        horse.add(body);

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
        horse.add(leg2);
        leg3.position.set(-.5,.8,.25);
        horse.add(leg3);
        leg4.position.set(-.5,.8,-.25);
        horse.add(leg4);

        horse.add(leg1);

        let neckg = new T.CapsuleGeometry(.2,.6,32,32);
        let neck = new T.Mesh(neckg,brown);
        neck.position.set(.8,1.5,0);
        neck.scale.set(1.3,1,1);
        neck.rotateZ(-Math.PI/4);
        horse.add(neck);

        let headg = new T.CapsuleGeometry(.2,.3,32,32);
        let head = new T.Mesh(headg,brown);
        head.position.set(1.2,1.7,0);
        head.rotation.set(0,0,Math.PI/3);
        horse.add(head);

        let earg = new T.BoxGeometry(.1,.2,.05);
        let ear1 = new T.Mesh(earg,brown);
        ear1.position.set(1,2,.1);
        horse.add(ear1);
        let ear2 = new T.Mesh(earg,brown);
        ear2.position.set(1,2,-.1);
        horse.add(ear2);

        let maneg = new T.BoxGeometry(1,.2,.1);
        let mane = new T.Mesh(maneg, black);
        mane.position.set(.6,1.7,0);
        mane.rotation.set(0,0,Math.PI/4);
        horse.add(mane);
        let mane2 = mane.clone();
        mane2.position.set(-1,1,0);
        horse.add(mane2);

        let eyegeom = new T.CylinderGeometry(.05,.05,.4);
        let eye = new T.Mesh(eyegeom,black);
        eye.position.set(1.2,1.75,0);
        eye.rotation.set(Math.PI/2,0,0);
        horse.add(eye);
        
        horse.scale.set(.8,.8,.8);
        /////
        horse.scale.set(.6,.6,.6);
        horse.translateX(2);
        cart.add(horse);

        let horsereing = new T.BoxGeometry(1.3,0.05,0.05);
        let horserein1 = new T.Mesh(horsereing,wood_mat);
        let horserein2 = horserein1.clone();
        horserein1.position.set(1.9,.7,.24);
        horserein1.rotation.set(0,Math.PI/11,Math.PI/8);
        cart.add(horserein1);
        horserein2.position.set(1.9,.7,-.24);
        horserein2.rotation.set(0,-Math.PI/11,Math.PI/8);
        cart.add(horserein2);

        let ringgeom = new T.CylinderGeometry(.2,.2,.1);
        let ring = new T.Mesh(ringgeom,wood_mat);
        ring.position.set(2.5,.9,0);
        ring.rotateZ(-Math.PI/4);
        cart.add(ring);

        cart.rotateY(-Math.PI/2);
        obj.add(cart);

        super("Cart",obj);
        this.track = track;
        this.u = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.5);
        ///this.ridePoint.translateZ(0.5);      //turn off hideObject in GrWorld to see cart while driving
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.cart = obj;
        this.spin1 = spin1;
        this.spin2 = spin2;
        this.leg1 = leg1;
        this.leg2 = leg2;
        this.leg3 = leg3;
        this.leg4 = leg4;

    }
    stepWorld(delta, timeOfDay) {
        this.u += delta / 10000;
        let pos = this.track.eval(this.u);
        this.objects[0].position.set(pos[0], 0.15+pos[1], pos[2]);
        let dir = this.track.tangent(this.u);
        let zAngle = Math.atan2(dir[2], dir[0]);
        this.objects[0].rotation.y = -zAngle - Math.PI/2;
        this.spin1.rotateZ(-0.001*delta);
        this.spin2.rotateZ(-0.001*delta);
        this.leg1.rotateZ(.03*Math.sin(50*this.u));
        this.leg2.rotateZ(-.03*Math.sin(50*this.u));
        this.leg3.rotateZ(.03*Math.sin(50*this.u));
        this.leg4.rotateZ(-.03*Math.sin(50*this.u));

    }
  }