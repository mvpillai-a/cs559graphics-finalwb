/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

import {main} from "../examples/main.js";

//Imported items:
import {GrWindmill, GrHouse, GrHouse2, GrDock, GrMine, GrBlacksmith, GrStable, GrFence} from "./buildings.js";
import {GrIsland, GrTree, GrRockObj, GrSpreadRocks, GrMushroom, GrMushroomCluster} from "./landscape.js";
import {GrTrack,GrCart} from "./track.js";
import {FbxGrObject, ObjGrObject} from "../libs/CS559-Framework/loaders.js";
import {GrShip} from "./ship.js";
import {GrFisherman, GrHorse, GrMovingHorse} from "./living.js";
import { GrParticles } from "./particle.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplane: null,  // make the ground plane big enough for a world of stuff
});
//main(world) // this calls the example code (that puts a lot of objects into the world)

//world.scene.fog = new T.Fog( 0xcccccc, 40, 100 ); //fog

function shift(grobj, x, y, z) {
    grobj.objects.forEach(element => {
        element.position.set(x,y,z);
    });
  return grobj;
}

function roty(grobj, ry) {
    grobj.objects.forEach(element => {
        element.rotation.y = ry;
    });
  return grobj;
}

//skybox:
world.scene.background = new T.CubeTextureLoader()
.setPath("../textures/cubemap/")
.load([
    "sky3.png",
    "sky1.png",
    "sky5.png",
    "sky6.png",
    "sky2.png",
    "sky4.png"
]);

let island = new GrIsland();
world.add(island);

//Buildings/Structures:
let windmill = new GrWindmill();
windmill = shift(windmill,6,0,0);
windmill = roty(windmill,-Math.PI/6);
windmill.setScale(2);
world.add(windmill);

let house1 = new GrHouse();
house1.setScale(2);
house1 = shift(house1,3,0,-7);
world.add(house1);
let particle1 = new GrParticles(4,4.8,-6.4);
world.add(particle1);

let house2 = new GrHouse();
house2.setScale(2);
house2 = shift(house2,-6,0,-12);
house2 = roty(house2,Math.PI/3);
world.add(house2);
let particle2 = new GrParticles(2,4.8,-13.7);
world.add(particle2);

let house3 = new GrHouse();
house3.setScale(2);
house3 = shift(house3,3,0,-13);
house3 = roty(house3,Math.PI);
world.add(house3);
let particle3 = new GrParticles(-5,4.8,-12.6);
world.add(particle3);

let bighouse = new GrHouse2();
bighouse.setScale(2);
bighouse = shift(bighouse,-7,0,-6);
bighouse = roty(bighouse,Math.PI/2);
world.add(bighouse);
let particle4 = new GrParticles(-6.4,4.8,-4.2);
world.add(particle4);

let bighouse2 = new GrHouse2();
bighouse2.setScale(2);
bighouse2 = shift(bighouse2,11,0,-15);
bighouse2 = roty(bighouse2,-Math.PI/2);
world.add(bighouse2);
let particle5 = new GrParticles(10.4,4.8,-16.9);
world.add(particle5);

let dock = new GrDock();
world.add(dock);

let well = new FbxGrObject({fbx:"../objects/Well.fbx",norm:2,name:"Well(loaded)",x:3,z:-10});
world.add(well);

let mine = new GrMine();
world.add(mine);

let blacksmith = new GrBlacksmith();
blacksmith.setScale(2);
blacksmith = shift(blacksmith, 11,0,-3);
blacksmith = roty(blacksmith, -3*Math.PI/4);
world.add(blacksmith);
let particle6 = new GrParticles(11,1.5,-4.5);
world.add(particle6);
let particle7 = new GrParticles(11.5,1.5,-2.5);
world.add(particle7);

let stables = new GrStable();
stables.setScale(2);
stables = roty(stables, -Math.PI/2);
world.add(stables);

let fence = new GrFence();
fence = shift(fence, -9,0,7);
fence = roty(fence, 7*Math.PI/18);
world.add(fence);

//Vehicles:
let track = new GrTrack();
world.add(track);
let cart = new GrCart(track);
world.add(cart);

let ship = new GrShip();
ship = shift(ship,5,-.2,7);
ship = roty(ship,-Math.PI/2);
world.add(ship);

//Landscape:
let tree = new GrTree();
tree = shift(tree,-2,0,-4);
tree.setScale(2);
world.add(tree);

let tree2 = new GrTree();
tree2 = shift(tree2,6,0,-12);
tree2.setScale(2);
world.add(tree2);

let bigtree = new ObjGrObject({obj:"../objects/model.obj",mtl:"../objects/materials.mtl",name:"BigTree(Loaded)"});
bigtree = shift(bigtree, -8,2.5,0);
bigtree = roty(bigtree, Math.PI/2);
bigtree.setScale(2,2,2);
world.add(bigtree);

let rock = new GrRockObj();
rock = shift(rock,0,0,-10);
rock = roty(rock,Math.PI/3);
world.add(rock);

let rocks = new GrSpreadRocks();
world.add(rocks);

let mushroom = new GrMushroom();
mushroom = shift(mushroom,-5,0,-17);
world.add(mushroom);

let mushroomCluster = new GrMushroomCluster();
mushroomCluster = shift(mushroomCluster, 17,0,-17);
world.add(mushroomCluster);

//Creatures:
let fishing = new GrFisherman();
fishing = shift(fishing, 2,0.05,12);
fishing = roty(fishing, -Math.PI/6);
fishing.setScale(.5,.5,.5);
world.add(fishing);

let horse = new GrHorse("#925920",0);
horse = shift(horse, -8,0,10);
horse.setScale(.6,.6,.6);
world.add(horse);

let movehorse = new GrMovingHorse("#6E695C");
movehorse = shift(movehorse, -9,0,7);
movehorse = roty(movehorse, 7*Math.PI/18);
world.add(movehorse);

///////////////////////////////////////////////////////////////
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
highlight("Windmill");
highlight("Cart");
highlight("House-1");
highlight("BigHouse-1");
highlight("Well(loaded)");
highlight("Ship");
highlight("Tree-1");
highlight("Dock");
highlight("Rocks");
highlight("Mineshaft");
highlight("Mushroom-1");
highlight("Fisherman")
highlight("Horse");
highlight("Blacksmith's");
highlight("Stable");
highlight("MovingHorse");
highlight("BigTree(Loaded)");

///////////////////////////////////////////////////////////////
// build and run the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
