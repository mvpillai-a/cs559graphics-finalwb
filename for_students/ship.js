// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let wooden = new T.TextureLoader().load("../textures/darkwood.jpeg");
let wooden2 =new T.TextureLoader().load("../textures/darkwood.jpeg");
let wooden3 =new T.TextureLoader().load("../textures/darkwood.jpeg");

export class GrShip extends GrObject{
    constructor(){
        let ship = new T.Object3D();
        let obj = new T.Object3D();

        wooden.rotation = Math.PI/2;
        wooden.wrapS = wooden.wrapT = T.RepeatWrapping;

        const pts = [];
        for ( let i = 0; i <= 14; i ++ ) {
            pts.push(new T.Vector2(Math.pow(Math.cos(i/10)*2,2), i/2));
        }
        let front_geom = new T.LatheGeometry(pts,30,0,Math.PI);
        let mat = new T.MeshBasicMaterial({color:"white",map:wooden,side:T.DoubleSide});
        let front_mesh = new T.Mesh(front_geom,mat);
        front_mesh.rotation.set(Math.PI,0,Math.PI/2);
        obj.add(front_mesh);

        let bottom_geom = new T.CylinderGeometry(4,4,10,30,10,true,0,Math.PI);
        let bottom_mesh = new T.Mesh(bottom_geom,mat);
        bottom_mesh.position.set(5,0,0);
        bottom_mesh.rotation.set(Math.PI,0,Math.PI/2);
        obj.add(bottom_mesh);

        let backg = new T.SphereGeometry(4,32,16,0,Math.PI/2); 
        let backm = new T.Mesh(backg,mat);
        backm.rotation.set(Math.PI/2,Math.PI/2,0);
        backm.position.set(10,0,0);
        obj.add(backm);

        let circ = new T.CircleGeometry(4,32,0,Math.PI); 
        let circm = new T.Mesh( circ,mat);
        circm.rotateX(Math.PI/2);
        circm.rotateZ(-Math.PI/2);
        circm.position.set(10,3,0);
        obj.add(circm);

        let hullg = new T.CylinderGeometry(4,4,3,30,1,true,0,Math.PI);
        let hullm = new T.Mesh(hullg,mat);
        hullm.position.set(10,1.5,0);
        obj.add(hullm);

        let black = new T.MeshStandardMaterial({color:"black"})
        let side1g = new T.TorusGeometry(4, 0.2, 16, 100,Math.PI); 
        let side1 = new T.Mesh( side1g, mat );
        side1.rotation.set(Math.PI/2,0,-Math.PI/2);
        side1.position.set(10,4,0);
        obj.add(side1);
        
        let side2g = new T.BoxGeometry(5,5,1);
        let side2 = new T.Mesh(side2g, mat);
        side2.position.set(8,2,3.4);
        let side3 = side2.clone();
        side3.position.set(8,2,-3.4);
        obj.add(side2);
        obj.add(side3);

        let side4g = new T.BoxGeometry(2,3,1);
        let side4 = new T.Mesh(side4g, mat);
        side4.position.set(4.6,.6,3.4);
        let side5 = side4.clone();
        side5.position.set(4.6,.6,-3.4);
        obj.add(side4);
        obj.add(side5);

        let shape = new T.Shape();
        shape.moveTo(-5.5,0);
        shape.bezierCurveTo(-5,0,-1.5,4.5,0,4);
        shape.lineTo(10,4);
        shape.bezierCurveTo(10.5,3,11.55,2,11.55,0);
        shape.bezierCurveTo(11.55,-2,10.5,-3,10,-4);
        shape.lineTo(0,-4);
        shape.bezierCurveTo(-1.5,-4.5,-5,0,-5.5,0);
        let floor_geom = new T.ShapeGeometry(shape);
        wooden2.wrapS = T.MirroredRepeatWrapping;
        wooden2.wrapT = T.RepeatWrapping;
        wooden2.repeat.set(0.1,0.1);
        let mat2 = new T.MeshBasicMaterial({color:"white",map:wooden2,side:T.DoubleSide});
        let floor_mesh = new T.Mesh(floor_geom, mat2) ;
        floor_mesh.rotation.set(Math.PI/2,0,0);
        floor_mesh.position.set(0,-1,0);
        obj.add(floor_mesh);

        let cabin = new T.Object3D();
        let cabin_geom = new T.BoxGeometry(3,4,7);
        let cabin_mesh = new T.Mesh(cabin_geom,mat);
        cabin_mesh.position.set(5.5,1,0);
        cabin.add(cabin_mesh);

        let triangle = new T.Shape();
        triangle.moveTo(0,0);
        triangle.lineTo(3,0);
        triangle.lineTo(3,4);
        triangle.lineTo(0,0);

        let triangle2 = new T.Shape();
        triangle2.moveTo(0,0);
        triangle2.lineTo(2,0);
        triangle2.lineTo(2,4);
        triangle2.lineTo(0,0);

        let extrudeSettings2 = {
            steps: 2,
            depth: 7,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };

        let tri_geom = new T.ExtrudeGeometry(triangle, extrudeSettings2 );
        let tri_mesh = new T.Mesh(tri_geom,mat2) ;
        tri_mesh.position.set(1,-1,-3.5);
        cabin.add(tri_mesh);

        let tri2_geom = new T.ExtrudeGeometry(triangle2, extrudeSettings2 );
        let tri2_mesh = new T.Mesh(tri2_geom,mat2) ;
        tri2_mesh.position.set(9,3,-3.5);
        tri2_mesh.rotation.set(0,0,Math.PI);
        cabin.add(tri2_mesh);
        cabin.position.set(3,0,0);
        obj.add(cabin);

        let cyl_geom = new T.CylinderGeometry(.1,.4,10);
        let cyl_mesh = new T.Mesh(cyl_geom,mat);
        cyl_mesh.position.set(2,4,0);
        obj.add(cyl_mesh);

        let cyl2 = cyl_mesh.clone();
        let cyl3 = cyl_mesh.clone();
        cyl2.position.set(8,5,0);
        cyl3.position.set(-2,2,0);
        obj.add(cyl2);
        obj.add(cyl3);

        let hor = new T.CylinderGeometry(.1,.1,5);
        let hor1 = new T.Mesh(hor,mat);
        hor1.position.set(-2.2,0.5,0);
        hor1.rotation.set(Math.PI/2,0,0);
        let hor2 = hor1.clone();
        hor2.position.set(-2.2,4.5,0);
        let hor3 = hor1.clone();
        hor3.position.set(1.8,0.5,0);
        let hor4 = hor1.clone();
        hor4.position.set(1.8,5.5,0);
        let hor5 = hor1.clone();
        hor5.position.set(7.8,4,0);
        let hor6 = hor1.clone();
        hor6.position.set(7.8,8,0);
        obj.add(hor1);
        obj.add(hor2);
        obj.add(hor3);
        obj.add(hor4);
        obj.add(hor5);
        obj.add(hor6);

        const vert = [
            1, 1,-1,    -1, 1,-1,
            1, 1, 1,    -1, 1, 1,
        ];
        
        const indices = [
            2,0,1,  2,1,3
        ];
        
        const sail_geom = new T.PolyhedronGeometry( vert, indices, 6, 2 );
        let white = new T.MeshStandardMaterial({color:"white",side:T.DoubleSide});
        let sail1 = new T.Mesh(sail_geom,white);
        sail1.position.set(-.2,2.5,0);
        sail1.rotation.set(0,0,Math.PI/2);
        sail1.scale.set(0.6,0.6,0.6);
        let sail2 = sail1.clone();
        sail2.position.set(4.3,3,0);
        sail2.scale.set(0.7,0.7,0.7);
        let sail3 = sail1.clone();
        sail3.position.set(9.9,6,0);
        obj.add(sail1);
        obj.add(sail2);
        obj.add(sail3);

        let flag_geom = new T.BoxGeometry(2,1,.1);
        let flag1 = new T.Mesh(flag_geom,white);
        flag1.position.set(9,9.4,0);
        let flag2 = flag1.clone();
        flag2.position.set(-1,6.4,0);
        obj.add(flag1);
        obj.add(flag2);

        let crow_geom = new T.CylinderGeometry(1,1,0.1);
        let crow = new T.Mesh(crow_geom,mat);
        crow.position.set(2,7,0);
        obj.add(crow);


        obj.scale.set(.5,.5,.5);
        obj.rotateY(Math.PI/2);
        obj.rotateX(-0.02*Math.PI);
        ship.add(obj);

        super("Ship",ship);
        this.ship = ship;
        this.time = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }
    stepWorld(delta){
        this.time += delta/1000;
        this.ship.translateY(0.004*Math.sin(this.time));
        this.ship.rotateZ(.002*Math.sin(this.time));
    }
}