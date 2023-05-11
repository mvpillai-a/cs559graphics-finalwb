/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { DoubleSide } from "../libs/CS559-Three/build/three.module.js";
import { GrHorse } from "./living.js";

// define your buildings here - remember, they need to be imported
// into the "main" program
let stone = new T.TextureLoader().load("../textures/stonewall.jpeg");
let slate = new T.TextureLoader().load("../textures/darkslate.jpg");
let wood = new T.TextureLoader().load("../textures/softwood.jpg");
let tiles = new T.TextureLoader().load("../textures/rooftiles.jpg");
let wooden_door = new T.TextureLoader().load("../textures/door.png");
let black_door = new T.TextureLoader().load("../textures/blackdoor.jpg");
let window = new T.TextureLoader().load("../textures/window.jpg");

export class GrWindmill extends GrObject {
    constructor() {
        let windmill = new T.Object3D();
        let base_geom = new T.CylinderGeometry(0.5,1,2);
        //repeats texture around cylinder to avoid stretching texture.
        stone.wrapS = T.RepeatWrapping;
        stone.wrapT = T.RepeatWrapping;
        stone.repeat.set(4,2);
        let stone_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: stone});
        let base = new T.Mesh(base_geom, stone_mat);
        base.position.y = 1;
        windmill.add(base);

        let roof_geom = new T.ConeGeometry(0.7,1);
        let slate_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: slate});
        let roof = new T.Mesh(roof_geom, slate_mat);
        roof.position.y = 2.5;
        windmill.add(roof);

        let rotations = new T.Object3D();
        rotations.position.set(0,2.5,0.9);

        let pole_geom = new T.BoxGeometry(0.08,0.08,1);
        let brown = new T.MeshStandardMaterial({roughness: 0.75, color: "#5C4033"});
        let pole = new T.Mesh(pole_geom,brown);
        pole.position.z = -0.4
        rotations.add(pole);

        let door_geom = new T.BoxGeometry(0.3,0.5,0.2);
        let bumpbrown = new T.MeshStandardMaterial({color:"#5C4033",bumpMap:slate,metalness:0.5});
        let door = new T.Mesh(door_geom,bumpbrown);
        door.position.set(0,0.25,0.9);
        windmill.add(door);

        let fan_geom = new T.BoxGeometry(3,0.05,0.01);
        let black = new T.MeshPhongMaterial({specular:1, color:"black"});
        let fan1 = new T.Mesh(fan_geom,black);
        let fan2 = fan1.clone();
        fan2.rotation.z = Math.PI/2;
        rotations.add(fan1);
        rotations.add(fan2);

        let grid_geom = new T.BoxGeometry(1.4,0.5,0.01,10,2);
        let frame = new T.MeshStandardMaterial({color:"black",wireframe:true});
        let grid1 = new T.Mesh(grid_geom,frame);
        let grid2 = grid1.clone();
        let grid3 = grid1.clone();
        let grid4 = grid1.clone();
        grid1.position.set(0.8,-0.25,0);
        rotations.add(grid1);

        grid2.rotateZ(Math.PI/2);
        grid2.position.set(-0.25,-0.8,0);
        rotations.add(grid2);

        grid3.position.set(-0.8,0.25,0);
        rotations.add(grid3);

        grid4.rotateZ(Math.PI/2);
        grid4.position.set(0.25,0.8,0);
        rotations.add(grid4);

        windmill.add(rotations);

        super("Windmill", windmill);
        this.windmill = windmill;
        this.spin = rotations;
    }
    stepWorld(delta){
        this.spin.rotateZ(0.0005*delta);
    }
}

let housecount = 0;
export class GrHouse extends GrObject{
    constructor(){
        let house = new T.Object3D();

        let lower_geom = new T.BoxGeometry(1.5,0.8,1);
        let stone2 = stone.clone();
        stone2.repeat.set(0.7,0.7);
        let stone_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: stone2});
        let lower = new T.Mesh(lower_geom,stone_mat);
        lower.position.y = 0.4;
        house.add(lower);

        let upper_geom = new T.BoxGeometry(1.7,0.8,1.2);
        let wood_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wood});
        let upper = new T.Mesh(upper_geom,wood_mat);
        upper.position.y = 1.2;
        house.add(upper);

        let line1_geom = new T.BoxGeometry(1.8,0.1,0.1);
        let brown = new T.MeshStandardMaterial({roughness: 0.75, color: "#483C32"});
        let line1 = new T.Mesh(line1_geom, brown);
        let line2 = line1.clone()
        //longer-edge
        line1.position.set(0,0.8,0.6);
        line2.position.set(0,0.8,-0.6);
        house.add(line1);
        house.add(line2);
        let line2_geom = new T.BoxGeometry(0.1,0.1,1.3);
        let line3 = new T.Mesh(line2_geom, brown);
        let line4 = line3.clone()
        //shorter-edge
        line3.position.set(0.85,0.8,0);
        line4.position.set(-0.85,0.8,0);
        house.add(line3);
        house.add(line4);
        let line3_geom = new T.BoxGeometry(0.1,0.9,0.1);
        let line5 = new T.Mesh(line3_geom,brown);
        let line6 = line5.clone()
        let line7 = line5.clone()
        let line8 = line5.clone()
        let line9 = line5.clone()
        let line10 = line5.clone()
        //corners
        line5.position.set(0.85,1.2,0.6);
        line6.position.set(0.85,1.2,-0.6);
        line7.position.set(-0.85,1.2,0.6);
        line8.position.set(-0.85,1.2,-0.6);
        line9.position.set(0,1.2,0.6);
        line10.position.set(0,1.2,-0.6);
        house.add(line5);
        house.add(line6);
        house.add(line7);
        house.add(line8);
        house.add(line9);
        house.add(line10);

        let triangle = new T.Shape();
        triangle.moveTo(0,0);
        triangle.lineTo(1.2,0);
        triangle.lineTo(1.2/2,0.5);
        triangle.lineTo(0,0);
        let extrudeSettings = {depth:1.7, bevelEnabled: false};
        let prism = new T.ExtrudeGeometry( triangle, extrudeSettings );
        let top = new T.Mesh(prism,wood_mat);
        top.position.set(-0.85,1.6,0.6);
        top.rotateY(Math.PI/2);
        house.add(top);

        let roof_geom = new T.BoxGeometry(1.9,0.1,1);
        tiles.wrapS = T.RepeatWrapping;
        tiles.wrapT = T.RepeatWrapping;
        tiles.repeat.set(2,1);
        let roofing = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: tiles});
        let roof1 = new T.Mesh(roof_geom,roofing);
        let roof2 = roof1.clone();
        roof1.position.set(0,1.8,0.4);
        roof1.rotateX(Math.PI/4-0.1);
        roof2.position.set(0,1.8,-0.4);
        roof2.rotateX(-(Math.PI/4-0.1));
        house.add(roof1);
        house.add(roof2);

        let beam_geom = new T.BoxGeometry(2,0.2,0.1);
        let beam = new T.Mesh(beam_geom,brown);
        beam.position.set(0,2.1,0);
        house.add(beam);

        let door_geom = new T.BoxGeometry(0.3,0.5,0.2);
        let door_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wooden_door});
        let door = new T.Mesh(door_geom,door_mat);
        door.position.set(0.3,0.25,0.42);
        house.add(door);

        let frame_geom = new T.BoxGeometry(0.05,0.5,0.1);
        let frame1 = new T.Mesh(frame_geom,wood_mat);
        let frame2 = frame1.clone();
        frame1.position.set(0.125,0.25,0.5);
        frame2.position.set(0.475,0.25,0.5);
        house.add(frame1);
        house.add(frame2);
        let frame2_geom = new T.BoxGeometry(0.4,0.05,0.1);
        let frame3 = new T.Mesh(frame2_geom,wood_mat);
        frame3.position.set(0.3,0.5,0.5);
        house.add(frame3);

        let window_geom = new T.BoxGeometry(0.3,0.3,0.3);
        let window_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: window});
        let window1 = new T.Mesh(window_geom,window_mat);
        let window2 = window1.clone();
        let window3 = window1.clone();
        let window4 = window1.clone();
        let window5 = window1.clone();
        let window6 = window1.clone();
        let window7 = window1.clone();
        let window8 = window1.clone();
        let window9 = window1.clone();
        let window10 = window1.clone();
        let window11 = window1.clone();
        window1.position.set(-0.3,0.3,0.4);
        window2.position.set(-0.65,0.3,0);
        window3.position.set(0.65,0.3,0);
        window4.position.set(-0.3,0.3,-0.4);
        window5.position.set(0.3,0.3,-0.4);
        window6.position.set(-0.4,1.2,0.5);
        window7.position.set(0.4,1.2,0.5);
        window8.position.set(0.4,1.2,-0.5);
        window9.position.set(-0.4,1.2,-0.5);
        window10.position.set(-0.75,1.2,0);
        window11.position.set(0.75,1.2,0);
        house.add(window1);
        house.add(window2);
        house.add(window3);
        house.add(window4);
        house.add(window5);
        house.add(window6);
        house.add(window7);
        house.add(window8);
        house.add(window9);
        house.add(window10);
        house.add(window11);

        let stone3 = stone.clone();
        stone3.repeat.set(0.3,1);
        let stone_mat2 = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: stone3});

        let chimney_geom = new T.BoxGeometry(0.2,0.6,0.2);
        let chimney = new T.Mesh(chimney_geom,stone_mat2);
        chimney.position.set(0.5,2.1,0.3);
        house.add(chimney);

        super(`House-${++housecount}`,house);
    }
}

let bighousecount = 0;
export class GrHouse2 extends GrObject{
    constructor(){
        let house = new T.Object3D();

        let lower_geom = new T.BoxGeometry(1.5,0.8,1);
        let stone2 = stone.clone();
        stone2.repeat.set(0.7,0.7);
        let stone_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: stone2});
        let lower = new T.Mesh(lower_geom,stone_mat);
        lower.position.y = 0.4;
        house.add(lower);

        let lower_geom2 = new T.BoxGeometry(2,0.8,1);
        let lower2 = new T.Mesh(lower_geom2,stone_mat);
        lower2.position.set(-1.25,0.4,0.5);
        lower2.rotation.set(0,Math.PI/2,0);
        house.add(lower2);

        let upper_geom = new T.BoxGeometry(1.7,0.8,1.2);
        wood.wrapT = T.RepeatWrapping;
        let wood_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wood});
        let upper = new T.Mesh(upper_geom,wood_mat);
        upper.position.y = 1.2;
        house.add(upper);

        let upper_geom2 = new T.BoxGeometry(2.2,0.8,1.2);
        let upper2 = new T.Mesh(upper_geom2,wood_mat);
        upper2.position.set(-1.25,1.2,0.5);
        upper2.rotateY(Math.PI/2);
        house.add(upper2);

        let line1_geom = new T.BoxGeometry(1.8,0.1,0.1);
        let brown = new T.MeshStandardMaterial({roughness: 0.75, color: "#483C32"});
        let line1 = new T.Mesh(line1_geom, brown);
        let line2_geom = new T.BoxGeometry(2.8,0.1,0.1);
        let line2 = new T.Mesh(line2_geom, brown);
        //longer-edge
        line1.position.set(0,0.8,0.6);
        line2.position.set(-.5,0.8,-0.6);
        house.add(line1);
        house.add(line2);
        //shorter-edge
        let line3_geom = new T.BoxGeometry(0.1,0.1,1.3);
        let line3 = new T.Mesh(line3_geom, brown);
        let line4 = line3.clone()
        line3.position.set(0.85,0.8,0);
        line4.position.set(-0.85,0.8,0);
        house.add(line3);
        house.add(line4);
        let line11_geom = new T.BoxGeometry(0.1,0.1,2.3);
        let line11 = new T.Mesh(line11_geom,brown);
        line11.position.set(-1.85,0.8,0.5);
        let line12 = line11.clone();
        line12.position.set(-.65,0.8,0.5);
        house.add(line11);
        house.add(line12);
        let line13_geom =  new T.BoxGeometry(1.3,0.1,0.1);
        let line13 = new T.Mesh(line13_geom,brown);
        line13.position.set(-1.25,0.8,1.6);
        house.add(line13);
        //corners
        let line4_geom = new T.BoxGeometry(0.1,0.9,0.1);
        let line5 = new T.Mesh(line4_geom,brown);
        let line6 = line5.clone()
        let line7 = line5.clone()
        let line8 = line5.clone()
        let line9 = line5.clone()
        let line10 = line5.clone()
        let line14 = line5.clone()
        let line15 = line5.clone()
        let line16 = line5.clone()
        let line17 = line5.clone()
        line5.position.set(0.85,1.2,0.6);
        line6.position.set(0.85,1.2,-0.6);
        line7.position.set(-0.65,1.2,0.6);
        line8.position.set(-0.85,1.2,-0.6);
        line9.position.set(0,1.2,0.6);
        line10.position.set(0,1.2,-0.6);
        line14.position.set(-0.65,1.2,1.6);
        line15.position.set(-1.85,1.2,1.6);
        line16.position.set(-1.85,1.2,-0.6);
        line17.position.set(-1.85,1.2,0.5);
        house.add(line5);
        house.add(line6);
        house.add(line7);
        house.add(line8);
        house.add(line9);
        house.add(line10);
        house.add(line14);
        house.add(line15);
        house.add(line16);
        house.add(line17);

        let triangle = new T.Shape();
        triangle.moveTo(0,0);
        triangle.lineTo(1.2,0);
        triangle.lineTo(1.2/2,0.5);
        triangle.lineTo(0,0);
        let extrudeSettings = {depth:2.7, bevelEnabled: false};
        let prism = new T.ExtrudeGeometry( triangle, extrudeSettings );
        let top = new T.Mesh(prism,wood_mat);
        top.position.set(-1.85,1.6,0.6);
        top.rotateY(Math.PI/2);
        house.add(top);

        let extrudeSettings2 = {depth:2.2, bevelEnabled:false};
        let prism2 = new T.ExtrudeGeometry( triangle, extrudeSettings2);
        let top2 = new T.Mesh(prism2,wood_mat);
        top2.rotateY(Math.PI/2);
        top2.position.set(-.65,1.6,1.6);
        top2.rotateY(Math.PI/2);
        house.add(top2);

        let roof_geom = new T.BoxGeometry(2.9,0.1,1);
        tiles.wrapS = T.RepeatWrapping;
        tiles.wrapT = T.RepeatWrapping;
        tiles.repeat.set(2,1);
        let roofing = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: tiles});
        let roof1 = new T.Mesh(roof_geom,roofing);
        let roof2 = roof1.clone();
        roof1.position.set(-.5,1.8,0.4);
        roof1.rotateX(Math.PI/4-0.1);
        roof2.position.set(-.5,1.8,-0.4);
        roof2.rotateX(-(Math.PI/4-0.1));
        house.add(roof1);
        house.add(roof2);
        let roof_geom2 = new T.BoxGeometry(2.55,0.1,1);
        let roof3 = new T.Mesh(roof_geom2,roofing);
        let roof4 = roof3.clone();
        roof3.position.set(-.85,1.8,0.45);
        roof3.rotateY(Math.PI/2);
        roof3.rotateX(Math.PI/4-0.1);
        roof4.position.set(-1.65,1.8,0.45);
        roof4.rotateY(Math.PI/2);
        roof4.rotateX(-(Math.PI/4-0.1));
        house.add(roof3);
        house.add(roof4);

        let beam_geom = new T.BoxGeometry(3,0.2,0.1);
        let beam = new T.Mesh(beam_geom,brown);
        beam.position.set(-.5,2.1,0);
        house.add(beam);
        let beam_geom2 = new T.BoxGeometry(2.65,0.2,0.1);
        let beam2 = new T.Mesh(beam_geom2,brown);
        beam2.rotateY(Math.PI/2);
        beam2.position.set(-1.25,2.1,.45);
        house.add(beam2);

        let door_geom = new T.BoxGeometry(0.3,0.5,0.2);
        let door_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: black_door, bumpMap:black_door});
        let door = new T.Mesh(door_geom,door_mat);
        door.position.set(0.3,0.25,0.42);
        house.add(door);

        let frame = new T.Object3D();
        let frame_geom = new T.BoxGeometry(0.05,0.5,0.1);
        let frame1 = new T.Mesh(frame_geom,brown);
        let frame2 = frame1.clone();
        frame1.position.set(0.125,0.25,0.5);
        frame2.position.set(0.475,0.25,0.5);
        frame.add(frame1);
        frame.add(frame2);
        let frame2_geom = new T.BoxGeometry(0.4,0.05,0.1);
        let frame3 = new T.Mesh(frame2_geom,brown);
        frame3.position.set(0.3,0.5,0.5);
        frame.add(frame3);
        house.add(frame);

        let door_mat2 = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wooden_door});
        let door2 = new T.Mesh(door_geom,door_mat2);
        door2.position.set(-1.2,0.25,-.42);
        house.add(door2);
        let backdoorframe = frame.clone();
        backdoorframe.position.set(-1.5,0,-1);
        house.add(backdoorframe);

        let window_geom = new T.BoxGeometry(0.3,0.3,0.3);
        let window_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: window});
        let window1 = new T.Mesh(window_geom,window_mat);
        let window2 = window1.clone();
        let window3 = window1.clone();
        let window4 = window1.clone();
        let window5 = window1.clone();
        let window6 = window1.clone();
        let window7 = window1.clone();
        let window8 = window1.clone();
        let window9 = window1.clone();
        let window10 = window1.clone();
        let window11 = window1.clone();
        window1.position.set(-0.3,0.3,0.4);
        window2.position.set(-0.65,0.3,0);
        window3.position.set(0.65,0.3,0);
        window4.position.set(-0.3,0.3,-0.4);
        window5.position.set(0.3,0.3,-0.4);
        window6.position.set(-0.33,1.2,0.5);
        window7.position.set(0.4,1.2,0.5);
        window8.position.set(0.4,1.2,-0.5);
        window9.position.set(-0.4,1.2,-0.5);
        window10.position.set(-0.75,1.2,0);
        window11.position.set(0.75,1.2,0);
        house.add(window1);
        house.add(window2);
        house.add(window3);
        house.add(window4);
        house.add(window5);
        house.add(window6);
        house.add(window7);
        house.add(window8);
        house.add(window9);
        house.add(window10);
        house.add(window11);

        let window12 = window1.clone();
        let window13 = window1.clone();
        let window14 = window1.clone();
        let window15 = window1.clone();
        let window16 = window1.clone();
        let window17 = window1.clone();
        let window18 = window1.clone();
        let window19 = window1.clone();
        let window20 = window1.clone();
        window12.position.set(-.85,0.3,1);
        window13.position.set(-1.65,0.3,1);
        window14.position.set(-1.65,0.3,0);
        window15.position.set(-1.25,0.3,1.4);
        window16.position.set(-1.35,1.2,-0.5);
        window17.position.set(-1.75,1.2,0);
        window18.position.set(-1.75,1.2,1);
        window19.position.set(-1.25,1.2,1.5);
        window20.position.set(-.75,1.2,1.1);
        house.add(window12);
        house.add(window13);
        house.add(window14);
        house.add(window15);
        house.add(window16);
        house.add(window17);
        house.add(window18);
        house.add(window19);
        house.add(window20);

        let stone3 = stone.clone();
        stone3.repeat.set(0.3,1);
        let stone_mat2 = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: stone3});
        let chimney_geom = new T.BoxGeometry(0.2,0.6,0.2);
        let chimney = new T.Mesh(chimney_geom,stone_mat2);
        chimney.position.set(-.92,2.1,0.3);
        house.add(chimney);

        super(`BigHouse-${++bighousecount}`,house);
    }
}

export class GrDock extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        let dock_geom = new T.BoxGeometry(2,.2,8);
        let dock_mat = new T.MeshStandardMaterial({color:"white",map:wood});
        let dock_mesh = new T.Mesh(dock_geom, dock_mat)
        dock_mesh.rotation.set(0,Math.PI/3,0);
        dock_mesh.position.set(0,0,10);
        obj.add(dock_mesh);

        let cylg = new T.CylinderGeometry(.1,.1,4);
        let cyl = new T.Mesh(cylg,dock_mat);
        cyl.position.set(2.8,0,12.5);
        obj.add(cyl);
        let cyl2 = new T.Mesh(cylg,dock_mat);
        cyl2.position.set(3.5,0,11.3);
        obj.add(cyl2);
        let cyl3 = new T.Mesh(cylg,dock_mat);
        cyl3.position.set(0.8,0,9.6);
        obj.add(cyl3);
        let cyl4 = new T.Mesh(cylg,dock_mat);
        cyl4.position.set(0,0,10.9);
        obj.add(cyl4);

        super("Dock",obj)
    }
}

export class GrMine extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        let rock_geom = new T.OctahedronGeometry(1,1);
        let rock_mat = new T.MeshStandardMaterial({color:"grey",flatShading: true});
        let rock = new T.Mesh(rock_geom,rock_mat);
        rock.position.set(18,0,-10);
        rock.scale.set(3,3,5);
        obj.add(rock);
        let rock2 = new T.Mesh(rock_geom,rock_mat);
        rock2.position.set(18,0,-7);
        rock2.scale.set(3,5,2);
        obj.add(rock2);
        let rock3 = new T.Mesh(rock_geom,rock_mat);
        rock3.position.set(19,0,-10);
        rock3.scale.set(3,5,5);
        obj.add(rock3);
        let rock4 = new T.Mesh(rock_geom,rock_mat);
        rock4.position.set(19,0,-3);
        rock4.scale.set(3,3,5);
        obj.add(rock4);

        let holeg = new T.BoxGeometry(3,3,2);
        let black = new T.MeshStandardMaterial({color:"black"});
        let hole = new T.Mesh(holeg,black);
        hole.position.set(16.5,0,-10);
        obj.add(hole);

        let sideg = new T.BoxGeometry(2,3.2,0.2);
        let lightwood = new T.MeshStandardMaterial({color:"white",map:wood});
        let side = new T.Mesh(sideg,lightwood);
        side.position.set(15.7,0,-9);
        obj.add(side);
        let side2 = side.clone();
        side.position.set(15.7,0,-11);
        obj.add(side2);
        let topg = new T.BoxGeometry(2,0.3,2.8);
        let top = new T.Mesh(topg,lightwood);
        top.position.set(15.5,1.5,-10);
        obj.add(top);

        //Rail:
        let railg = new T.BoxGeometry(4,0.1,0.1);
        let brown = new T.MeshStandardMaterial({color: "#483C32"});
        let rail1 = new T.Mesh(railg,brown);
        rail1.position.set(13,0.05,-10.5);
        obj.add(rail1);
        let rail2 = rail1.clone();
        rail2.position.set(13,0.05,-9.5);
        obj.add(rail2);

        let divg = new T.BoxGeometry(.08,.08,1);
        let grey = new T.MeshStandardMaterial({color: "gray",metalness:0.7,roughness:0.5});
        let div1 = new T.Mesh(divg,grey);
        div1.position.set(14.5,.04,-10);
        obj.add(div1);
        let div2 = div1.clone();
        div2.position.set(14,.04,-10);
        obj.add(div2);
        let div3 = div1.clone();
        div3.position.set(13.5,.04,-10);
        obj.add(div3);
        let div4 = div1.clone();
        div4.position.set(13,.04,-10);
        obj.add(div4);
        let div5 = div1.clone();
        div5.position.set(12.5,.04,-10);
        obj.add(div5);
        let div6 = div1.clone();
        div6.position.set(12,.04,-10);
        obj.add(div6);
        let div7 = div1.clone();
        div7.position.set(11.5,.04,-10);
        obj.add(div7);

        let stopg = new T.BoxGeometry(.2,.8,.9);
        let stop = new T.Mesh(stopg,brown);
        stop.position.set(11.2,0.4,-10);
        obj.add(stop);

        let cart = new T.Object3D();
        let cartsg = new T.BoxGeometry(1,.8,.1);
        let carts1 = new T.Mesh(cartsg,grey);
        carts1.position.set(0,0,-.5);
        cart.add(carts1);
        let carts2 = carts1.clone();
        carts2.position.set(0,0,.5);
        cart.add(carts2);
        let cartbg = new T.BoxGeometry(.1,.8,1.1);
        let carts3 = new T.Mesh(cartbg,grey);
        carts3.position.set(-.45,0,0,);
        cart.add(carts3);
        let carts4 = carts3.clone();
        carts4.position.set(.45,0,0,);
        cart.add(carts4);
        let cartcg = new T.BoxGeometry(1,.1,1.1);
        let cartbot = new T.Mesh(cartcg,grey);
        cartbot.position.set(0,-.35,0);
        cart.add(cartbot);

        let cylg = new T.CylinderGeometry(.2,.2,.1);
        let wheel1 = new T.Mesh(cylg,brown);
        wheel1.position.set(0,-.4,0.6);
        wheel1.rotation.set(Math.PI/2,0,0);
        cart.add(wheel1);
        let wheel2 = wheel1.clone();
        wheel2.position.set(0,-.4,-0.6);
        cart.add(wheel2);
        let chaing = new T.BoxGeometry(0.5,0.2,0.2);
        let chain = new T.Mesh(chaing,grey);
        chain.position.set(.7,-.3,0);
        cart.add(chain);

        let mined = new T.Mesh(rock_geom,rock_mat);
        mined.position.set(0,.3,0);
        mined.scale.set(0.4,0.4,0.4);
        cart.add(mined);
        let mined2 = mined.clone();
        mined2.scale.set(0.5,0.2,0.5);
        mined2.position.set(0,0,0);
        cart.add(mined2);
        let mined3 = mined.clone();
        mined3.scale.set(0.2,0.2,0.5);
        mined3.position.set(0.2,0.3,0);
        cart.add(mined3);

        cart.position.set(12,0.6,-10);
        obj.add(cart);

        super("Mineshaft",obj);
    }
}

export class GrBlacksmith extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        let maing = new T.BoxGeometry(2,1,2);
        let stonetex = new T.MeshStandardMaterial({color:"grey", map:stone});
        let main = new T.Mesh(maing, stonetex);
        main.position.set(0,.5,0);
        obj.add(main)

        let door_geom = new T.BoxGeometry(0.3,0.5,0.2);
        let door_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: black_door, bumpMap:black_door});
        let door = new T.Mesh(door_geom,door_mat);
        door.position.set(0,0.25,.95);
        obj.add(door);

        let black = new T.MeshStandardMaterial({color:"black"});
        let frame = new T.Object3D();
        let frame_geom = new T.BoxGeometry(0.05,0.5,0.1);
        let frame1 = new T.Mesh(frame_geom,black);
        let frame2 = frame1.clone();
        frame1.position.set(-.17,0.25,1);
        frame2.position.set(.17,0.25,1);
        frame.add(frame1);
        frame.add(frame2);
        let frame2_geom = new T.BoxGeometry(0.4,0.05,0.1);
        let frame3 = new T.Mesh(frame2_geom,black);
        frame3.position.set(0,0.52,1);
        frame.add(frame3);
        obj.add(frame);

        let brown = new T.MeshStandardMaterial({roughness: 0.75, color: "#483C32"});
        let line_geom = new T.BoxGeometry(0.1,1,0.1);
        let line = new T.Mesh(line_geom, brown);
        line.position.set(1,.5,1);
        obj.add(line);
        let line2 = line.clone();
        line2.position.set(1,.5,-1);
        obj.add(line2);
        let line3 = line.clone();
        line3.position.set(-1,.5,1);
        obj.add(line3);
        let line4 = line.clone();
        line4.position.set(-1,.5,-1);
        obj.add(line4);

        let line5_geom = new T.BoxGeometry(2.5,.1,.1);
        let line5 = new T.Mesh(line5_geom,brown);
        line5.position.set(0,1,1);
        obj.add(line5);
        let line6 = line5.clone();
        line6.position.set(0,1,-1);
        obj.add(line6);
        let line7 = line5.clone();
        line7.rotateY(Math.PI/2);
        line7.position.set(-1,1,0);
        obj.add(line7);
        let line8 = line7.clone();
        line8.position.set(1,1,0);
        obj.add(line8);

        let line9 = line5.clone();
        line9.position.set(0,.9,0);
        obj.add(line9);
        let line10 = line5.clone();
        line10.position.set(0,.9,0.5);
        obj.add(line10);
        let line11 = line5.clone();
        line11.position.set(0,.9,-.5);
        obj.add(line11);

        let window_geom = new T.BoxGeometry(0.3,0.3,0.3);
        let window_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "grey", map: window});
        let window1 = new T.Mesh(window_geom,window_mat);
        let window2 = window1.clone();
        window1.position.set(-.5,.5,.9);
        window2.position.set(.5,.5,.9);
        obj.add(window1);
        obj.add(window2);

        super("Blacksmith's",obj);
    }
}

export class GrStable extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        let maingeom = new T.BoxGeometry(2,1,1.2);
        let wood_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wood});
        let upper = new T.Mesh(maingeom,wood_mat);
        upper.position.y = .4;
        obj.add(upper);

        let triangle = new T.Shape();
        triangle.moveTo(0,0);
        triangle.lineTo(1.2,0);
        triangle.lineTo(1.2/2,0.5);
        triangle.lineTo(0,0);
        let extrudeSettings = {depth:2, bevelEnabled: false};
        let prism = new T.ExtrudeGeometry( triangle, extrudeSettings );
        let top = new T.Mesh(prism,wood_mat);
        top.position.set(-1,.9,.6);
        top.rotateY(Math.PI/2);
        obj.add(top);

        let roof_geom = new T.BoxGeometry(2.2,0.1,1);
        tiles.wrapS = T.RepeatWrapping;
        tiles.wrapT = T.RepeatWrapping;
        tiles.repeat.set(2,1);
        let roofing = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: tiles});
        let roof1 = new T.Mesh(roof_geom,roofing);
        let roof2 = roof1.clone();
        let roof3 = roof1.clone();
        roof1.position.set(0,1.1,0.4);
        roof1.rotateX(Math.PI/4-0.1);
        roof2.position.set(0,1.1,-0.4);
        roof2.rotateX(-(Math.PI/4-0.1));
        obj.add(roof1);
        obj.add(roof2);
        obj.add(roof3);
        roof3.position.set(0,.8,1.1);
        let brown = new T.MeshStandardMaterial({roughness: 0.75, color: "#483C32"});
        let beam_geom = new T.BoxGeometry(2.3,0.2,0.1);
        let beam = new T.Mesh(beam_geom,brown);
        beam.position.set(0,1.4,0);
        obj.add(beam);

        let door_geom = new T.BoxGeometry(0.3,0.5,0.2);
        let door_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: wooden_door});
        let door = new T.Mesh(door_geom,door_mat);
        door.position.set(.95,0.25,0);
        door.rotation.set(0,Math.PI/2,0);
        obj.add(door);

        let frame_geom = new T.BoxGeometry(0.05,0.5,0.1);
        let frame1 = new T.Mesh(frame_geom,brown);
        let frame2 = frame1.clone();
        frame1.position.set(1.01,0.25,0.17);
        frame1.rotateY(Math.PI/2);
        frame2.position.set(1.01,0.25,-0.17);
        frame2.rotateY(Math.PI/2);
        obj.add(frame1);
        obj.add(frame2);
        let frame2_geom = new T.BoxGeometry(0.4,0.05,0.1);
        let frame3 = new T.Mesh(frame2_geom,brown);
        frame3.position.set(1.01,0.5,0);
        frame3.rotateY(Math.PI/2);
        obj.add(frame3);

        let window_geom = new T.BoxGeometry(0.3,0.3,0.3);
        let window_mat = new T.MeshStandardMaterial({roughness: 0.75, color: "white", map: window});
        let window1 = new T.Mesh(window_geom,window_mat);
        let window2 = window1.clone();
        let window3 = window1.clone();
        let window4 = window1.clone();
        let window5 = window1.clone();
        window1.position.set(.9,.9,0);
        window2.position.set(-.9,.9,0);
        window3.position.set(-.9,.3,0);
        window4.position.set(-.5,.3,-.5);
        window5.position.set(.5,.3,-.5);
        obj.add(window1);
        obj.add(window2);
        obj.add(window3);
        obj.add(window4);
        obj.add(window5);

        let colgeom = new T.BoxGeometry(.05,.8,.05);
        let col1 = new T.Mesh(colgeom,brown);
        col1.position.set(-1,.4,1.5);
        obj.add(col1);
        let col2 = col1.clone();
        let col3 = col1.clone();
        col2.position.set(1,.4,1.5);
        col3.position.set(0,.4,1.5);
        obj.add(col2);
        obj.add(col3);

        let horgeom1 = new T.BoxGeometry(.05,.05,.9);
        let hor1 = new T.Mesh(horgeom1,brown);
        hor1.position.set(-1,0.3,1.05);
        obj.add(hor1);
        let hor2 = hor1.clone();
        hor2.position.set(0,0.3,1.05);
        obj.add(hor2);
        let hor3 = hor1.clone();
        hor3.position.set(1,0.3,1.05);
        obj.add(hor3);

        let horgeom2 = new T.BoxGeometry(2,.05,.05);
        let hor4 = new T.Mesh(horgeom2,brown);
        hor4.position.set(0,0.3,1.5);
        obj.add(hor4);

        let hor5 = hor1.clone();
        hor5.position.set(-1,0.15,1.05);
        hor5.rotateX(Math.PI/10);
        obj.add(hor5);
        let hor6 = hor1.clone();
        hor6.position.set(-1,0.15,1.05);
        hor6.rotateX(-Math.PI/10);
        obj.add(hor6);
        let hor7 = hor1.clone();
        hor7.position.set(1,0.15,1.05);
        hor7.rotateX(Math.PI/10);
        obj.add(hor7);
        let hor8 = hor1.clone();
        hor8.position.set(1,0.15,1.05);
        hor8.rotateX(-Math.PI/10);
        obj.add(hor8);

        let horgeom3 = new T.BoxGeometry(1,.05,.05);
        let hor9 = new T.Mesh(horgeom3,brown);
        let hor10 = hor9.clone();
        let hor11 = hor9.clone();
        let hor12 = hor9.clone();
        hor9.position.set(-.5,0.15,1.5);
        hor9.rotateZ(Math.PI/10);
        obj.add(hor9);
        hor10.position.set(-.5,0.15,1.5);
        hor10.rotateZ(-Math.PI/10);
        obj.add(hor10);
        hor11.position.set(.5,0.15,1.5);
        hor11.rotateZ(Math.PI/10);
        obj.add(hor11);
        hor12.position.set(.5,0.15,1.5);
        hor12.rotateZ(-Math.PI/10);
        obj.add(hor12);

        

        let horse1 = new T.Object3D();
        let horse_mod1 = new GrHorse("#7C340E",0);
        horse_mod1.objects.forEach(element => {
            horse1.add(element);
        });
        horse1.position.set(-.6,0,1);
        horse1.scale.set(.4,.4,.4);
        horse1.rotation.set(0,-Math.PI/3,0);
        obj.add(horse1);

        let horse2 = new T.Object3D();
        let horse_mod2 = new GrHorse("#E9D3A4",0);
        horse_mod2.objects.forEach(element => {
            horse2.add(element);
        });
        horse2.position.set(.5,0,1);
        horse2.scale.set(.4,.4,.4);
        horse2.rotation.set(0,-Math.PI,0);
        obj.add(horse2);

        let haygeom = new T.BoxGeometry(.3,.2,.2);
        let haymat = new T.MeshStandardMaterial({color:"#FFD461"});
        let hay = new T.Mesh(haygeom,haymat);
        hay.position.set(-.1,.1,1.2);
        hay.rotateY(Math.PI/3);
        obj.add(hay);


        super("Stable",obj);
    }
}

export class GrFence extends GrObject{
    constructor(){
        let fence = new T.Object3D();

        let wood = new T.MeshStandardMaterial({roughness: 0.75, color: "#483C32"});
        let horgeom1 = new T.BoxGeometry(.1,.1,6);
        let hor1 = new T.Mesh(horgeom1,wood);
        hor1.position.set(-4,.6,0);
        fence.add(hor1);
        let hor2 = hor1.clone();
        hor2.position.set(4,.6,0);
        fence.add(hor2);
        let horgeom2 = new T.BoxGeometry(8,.1,.1);
        let hor3 = new T.Mesh(horgeom2, wood);
        hor3.position.set(0,.6,3);
        fence.add(hor3);
        let hor4 = hor3.clone();
        hor4.position.set(0,.6,-3);
        fence.add(hor4);
        let hor5 = hor1.clone()
        hor5.position.y = .3;
        fence.add(hor5);
        let hor6 = hor2.clone()
        hor6.position.y = .3;
        fence.add(hor6);
        let hor7 = hor3.clone()
        hor7.position.y = .3;
        fence.add(hor7);
        let hor8 = hor4.clone()
        hor8.position.y = .3;
        fence.add(hor8);

        let vergeom = new T.BoxGeometry(.1,.7,.1);
        let ver1 = new T.Mesh(vergeom, wood);
        ver1.position.set(0,.3,3);
        fence.add(ver1);
        let ver2 = ver1.clone();
        let ver3 = ver1.clone();
        let ver4 = ver1.clone();
        let ver5 = ver1.clone();
        let ver6 = ver1.clone();
        let ver7 = ver1.clone();
        let ver8 = ver1.clone();
        let ver9 = ver1.clone();
        let ver10 = ver1.clone();
        let ver11 = ver1.clone();
        let ver12 = ver1.clone();
        let ver13 = ver1.clone();
        let ver14 = ver1.clone();
        ver2.position.set(-4,.3,3);
        ver3.position.set(4,.3,3);
        ver4.position.set(-2,.3,3);
        ver5.position.set(2,.3,3);
        ver6.position.set(-4,.3,-3);
        ver7.position.set(4,.3,-3);
        ver8.position.set(-2,.3,-3);
        ver9.position.set(2,.3,-3);
        ver10.position.set(0,.3,-3);
        ver11.position.set(-4,.3,1);
        ver12.position.set(-4,.3,-1);
        ver13.position.set(4,.3,1);
        ver14.position.set(4,.3,-1);
        fence.add(ver2);
        fence.add(ver3);
        fence.add(ver4);
        fence.add(ver5);
        fence.add(ver6);
        fence.add(ver7);
        fence.add(ver8);
        fence.add(ver9);
        fence.add(ver10);
        fence.add(ver11);
        fence.add(ver12);
        fence.add(ver13);
        fence.add(ver14);

        super("Fence",fence);
    }
}