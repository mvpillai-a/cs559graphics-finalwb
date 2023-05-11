// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

let land = new T.TextureLoader().load("../textures/land.jpg");
let water = new T.TextureLoader().load("../textures/water.jpg");
let leaves = new T.TextureLoader().load("../textures/leaf.jpg");
let darkwood = new T.TextureLoader().load("../textures/darkwood.jpeg");

export class GrIsland extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        const shape = new T.Shape();
        shape.moveTo(-10,-20);
        shape.lineTo(-7,-17);
        shape.lineTo(-10,-10);
        shape.lineTo(-9.5,-8);
        shape.lineTo(-8,-5);
        shape.lineTo(-12,10);
        shape.lineTo(-10,11);
        shape.lineTo(-4,10);
        shape.lineTo(2,0);
        shape.lineTo(20,0);
        shape.lineTo(20,-20);
        shape.lineTo(-10,-20);

        const extrudeSettings = {
            steps: 1,
            depth: 1,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 1,
            bevelSegments: 3,
        };

        land.wrapS = T.RepeatWrapping;
        land.wrapT = T.RepeatWrapping;
        land.repeat.set(0.1,0.1);

        let island_geom = new T.ExtrudeGeometry( shape, extrudeSettings );
        let island_mat = new T.MeshStandardMaterial( {color:"white",map:land, bumpMap:land } );
        let island_mesh = new T.Mesh( island_geom, island_mat ) ;
        island_mesh.position.set(-1.9,-1,1.9);
        island_mesh.rotateX(Math.PI/2);
        obj.add(island_mesh);

        water.wrapS = water.wrapT = T.RepeatWrapping;
        water.offset = new T.Vector2(.1,.1);
        let sea_geom = new T.BoxGeometry(40,1,40);
        let sea_mat = new T.MeshStandardMaterial({color:"grey",map:water});
        let sea_mesh = new T.Mesh(sea_geom,sea_mat);
        sea_mesh.position.set(0,-2,0);
        obj.add(sea_mesh);

        super("Island",obj);
        this.time = 0;
    }
    stepWorld(delta){
        this.time += delta/100000;
        if(this.time<1){
            water.offset = new T.Vector2(this.time,this.time);
        }
        else{
            this.time = 0;
        }
    }
}

let treecount = 0;
export class GrTree extends GrObject{
    constructor(){
        let tree = new T.Object3D();

        let trunk_geom = new T.CylinderGeometry(0.05,0.1,1.5);
        let trunk_mat = new T.MeshStandardMaterial({roughness:0.75,color:"white",map:darkwood});
        let trunk = new T.Mesh(trunk_geom,trunk_mat);
        trunk.position.y = 1.5/2;
        tree.add(trunk);

        let leaf_geom = new T.IcosahedronGeometry(0.2,1);
        leaves.wrapS = T.RepeatWrapping;
        leaves.wrapT = T.RepeatWrapping;
        leaves.repeat.set(2,2);
        let green = new T.MeshStandardMaterial({
            roughness: 0.75,
            color: "white",
            map: leaves,
            bumpMap: leaves,
            side:T.DoubleSide,
            flatShading: true});
        let leaf1 = new T.Mesh(leaf_geom,green);
        let leaf2 = leaf1.clone();
        leaf2.scale.set(2,2,2);
        let leaf3 = leaf1.clone();
        let leaf4 = leaf1.clone();
        leaf4.scale.set(1.2,1.2,1.2);
        let leaf5 = leaf1.clone();
        let leaf6 = leaf1.clone();
        leaf6.scale.set(1.3,1.3,1.3);
        let leaf7 = leaf6.clone();
        leaf1.position.set(0,1.5,0);
        leaf2.position.set(0,1.2,0);
        leaf3.position.set(0,0.9,0);
        leaf4.position.set(0.3,1.1,0);
        leaf5.position.set(-0.2,1.1,0.2);
        leaf6.position.set(-0.1,1.3,0.2);
        leaf7.position.set(0.1,1,-0.2);
        tree.add(leaf1);
        tree.add(leaf2);
        tree.add(leaf3);
        tree.add(leaf4);
        tree.add(leaf5);
        tree.add(leaf6);
        tree.add(leaf7);

        super(`Tree-${++treecount}`,tree);
    }
}

export class GrRockObj extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        let rock_geom = new T.OctahedronGeometry(1,1);
        let rock_mat = new T.MeshStandardMaterial({color:"grey",flatShading: true});
        let rock = new T.Mesh(rock_geom,rock_mat);
        obj.add(rock);
        let rock2 = rock.clone();
        rock2.position.set(-1,0,0);
        rock2.scale.set(1,2,1);
        obj.add(rock2);

        super("Rocks",obj)
    }
}

export class GrSpreadRocks extends GrObject{
    constructor(){
        let obj = new T.Object3D();

        let rock_geom = new T.OctahedronGeometry(1,1);
        let rock_mat = new T.MeshStandardMaterial({color:"grey",flatShading: true});
        let rock = new T.Mesh(rock_geom,rock_mat);

        //Coast
        let rock4 = rock.clone();
        rock4.position.set(-12,0,13);
        rock4.scale.set(2,2,2);
        obj.add(rock4);
        let rock5 = rock4.clone();
        rock5.position.set(-10,-1.8,14);
        obj.add(rock5);
        let rock6 = rock4.clone();
        rock6.position.set(-12,-1,14);
        obj.add(rock6);
        let rock7 = rock4.clone();
        rock7.scale.set(3,2,2);
        rock7.position.set(-15,-1,14);
        rock7.rotation.set(0,-Math.PI/6,0);
        obj.add(rock7);
        let rock8 = rock.clone();
        rock8.position.set(-16,-1.5,12);
        rock8.scale.set(2,2,2);
        obj.add(rock8);

        let rock9 = rock.clone();
        rock9.position.set(15,0,0);
        rock9.scale.set(3,3,3);
        obj.add(rock9);
        let rock10 = rock4.clone();
        rock10.position.set(17,0,-3);
        obj.add(rock10);
        let rock11 = rock.clone();
        rock11.position.set(12,0,1);
        obj.add(rock11);
        let rock12 = rock.clone();
        rock12.position.set(14,0,-2);
        rock12.scale.set(1.2,1.2,1.2);
        obj.add(rock12);
        let rock13 = rock.clone();
        rock13.position.set(18,-1,2);
        rock13.scale.set(3,3,4);
        obj.add(rock13);

        super("SpreadRocks",obj)
    }
}

let mushroomcount = 0;
export class GrMushroom extends GrObject{
    constructor(){
        let obj = new T.Group;

        let spots = shaderMaterial("./shaders/mushroom.vs", "./shaders/mushroom.fs", {
            side: T.DoubleSide,
            uniforms: {radius: { value: 0.3 },dots: { value: 4.0 },},
        });

        let topg = new T.SphereGeometry(1,32,16,0,Math.PI);
        let top = new T.Mesh(topg,spots);
        top.position.set(0,1,0);
        top.rotateX(-Math.PI/2);
        obj.add(top);

        let bottomg = new T.CircleGeometry(1);
        let beige = new T.MeshStandardMaterial({color:"#D2C7B6", roughness:0.5, side:T.DoubleSide});
        let bottom = new T.Mesh(bottomg,beige)
        bottom.position.set(0,1,0);
        bottom.rotateX(Math.PI/2);
        obj.add(bottom);

        let stalkg = new T.CylinderGeometry(.3,.4,1);
        let stalk = new T.Mesh(stalkg,beige);
        stalk.position.set(0,.5,0);
        obj.add(stalk);

        super(`Mushroom-${++mushroomcount}`,obj);
    }
}

export class GrMushroomCluster extends GrObject{
    constructor(){
        let obj = new T.Group;
        let mushroom = new T.Object3D();

        let spots = shaderMaterial("./shaders/mushroom.vs", "./shaders/mushroom.fs", {
            side: T.DoubleSide,
            uniforms: {radius: { value: 0.3 },dots: { value: 4.0 },},
        });

        let topg = new T.SphereGeometry(1,32,16,0,Math.PI);
        let top = new T.Mesh(topg,spots);
        top.position.set(0,1,0);
        top.rotateX(-Math.PI/2);
        mushroom.add(top);

        let bottomg = new T.CircleGeometry(1);
        let beige = new T.MeshStandardMaterial({color:"#D2C7B6", roughness:0.5, side:T.DoubleSide});
        let bottom = new T.Mesh(bottomg,beige)
        bottom.position.set(0,1,0);
        bottom.rotateX(Math.PI/2);
        mushroom.add(bottom);

        let stalkg = new T.CylinderGeometry(.3,.4,1);
        let stalk = new T.Mesh(stalkg,beige);
        stalk.position.set(0,.5,0);
        mushroom.add(stalk);
        let mushroom2 = mushroom.clone();
        let mushroom3 = mushroom.clone();

        mushroom.rotateY(Math.PI/3);
        mushroom.scale.set(1.2,2,1.2);
        mushroom2.position.set(-2,0,0);
        mushroom3.position.set(-1,0,1.5);
        mushroom3.scale.set(.6,.6,.6);
        mushroom3.rotateY(2*Math.PI/3);


        obj.add(mushroom);
        obj.add(mushroom2);
        obj.add(mushroom3);

        super(`MushroomCluster`,obj);
    }
}
