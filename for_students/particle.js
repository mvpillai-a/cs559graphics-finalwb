// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let particlecount = 0;
export class GrParticles extends GrObject{
    constructor(x=0,y=0,z=0){
        let obj = new T.Object3D();
        obj.position.set(x,y,z);

        let points = [];

        let box_geom = new T.BoxGeometry(.1,.1,.1);
        let grey = new T.MeshStandardMaterial({color:"#535353"});
        let box = new T.Mesh(box_geom,grey);
        let box2 = box.clone();
        let box3 = box.clone();
        let box4 = box.clone();
        let box5 = box.clone();
        let box6 = box.clone();
        let box7 = box.clone();
        let box8 = box.clone();
        let box9 = box.clone();
        let box10 = box.clone();
        let box11 = box.clone();
        let box12 = box.clone();
        box.position.set(0,1,0);
        box2.position.set(-.2,.5,0);
        box3.position.set(.1,.7,.2);
        box4.position.set(.2,.5,-.2);
        box5.position.set(-.2,.9,.2);
        box6.position.set(-.2,1.2,-.1);
        box7.position.set(.1,1.4,0);
        box8.position.set(-.2,.1,.1);
        box9.position.set(.2,.3,.1);
        box10.position.set(0,.4,0);
        box11.position.set(-.2,1.4,0);
        box12.position.set(.1,1.8,.2);
        obj.add(box);
        obj.add(box2);
        obj.add(box3);
        obj.add(box4);
        obj.add(box5);
        obj.add(box6);
        obj.add(box7);
        obj.add(box8);
        obj.add(box9);
        obj.add(box10);
        obj.add(box11);
        obj.add(box12);
        points.push(box);
        points.push(box2);
        points.push(box3);
        points.push(box4);
        points.push(box5);
        points.push(box6);
        points.push(box7);
        points.push(box8);
        points.push(box9);
        points.push(box10);
        points.push(box11);
        points.push(box12);


        super(`Particle-${++particlecount}`,obj);
        this.points = points;
    }
    stepWorld(delta){
        this.points.forEach(element => {
            if(element.position.y < 2){
                element.position.y += .01;
            }
            else{
                element.position.y = 0;
            }
        });
    }
}