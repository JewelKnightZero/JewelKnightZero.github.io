import * as THREE from 'three';
//import { GUI } from './lil-gui.module.min.js';
//import { OrbitControls } from './OrbitControls.js';
//import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
//import { RenderPass } from './jsm/postprocessing/RenderPass.js';
//import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
//import { UnrealBloomPass } from './jsm/postprocessing/UnrealBloomPass.js';

class BloomGen {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

    
    }

    generateBloom() {

        //const renderScene = new RenderPass(this.scene, this.camera);
        //const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        //bloomPass.threshold = 5;
        //bloomPass.strength = 0;
        //bloomPass.radius = 0;

        //const bloomComposer = new EffectComposer(this.renderer);
        //bloomComposer.setSize(window.innerWith, window.innerHeight);
        //bloomComposer.renderToScreen = false;
        //bloomComposer.addPass( renderScene );
        //bloomComposer.addPass( bloomPass );
        


        const geometry = new THREE.IcosahedronGeometry( 1, 15 );
        for ( let i = 0; i < 50; i ++ ) {
        
            const color = new THREE.Color();
            color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
            //color.setHSL( 0.5, 1, 0.5);
            const material = new THREE.MeshBasicMaterial( { color: color } );
            const sphere = new THREE.Mesh( geometry, material );
            sphere.position.x = Math.random() * 10 - 5;
            sphere.position.y = Math.random() * 10 - 5;
            sphere.position.z = Math.random() * 10 - 5;
            sphere.position.normalize().multiplyScalar( Math.random() * 600.0 + 200.0 );
            //sphere.scale.setScalar( Math.random() * Math.random() * 50 + 10 );
            sphere.scale.setScalar( 5 );
            this.scene.add( sphere );
            //spheres.push(sphere);
            //console.log(spheres);
            //if ( Math.random() < 0.25 ) sphere.layers.enable( BLOOM_SCENE );
            //sphere.layers.enable( BLOOM_SCENE );
            //sphere.layers.set(1);
            //this.camera.layers.set(1);
            //bloomComposer.render();
            //sphere.layers.set(0);
            //this.camera.layers.set(0);
            const pointLight = new THREE.PointLight( color, 1, 200 );
            pointLight.position.set( sphere.position.x, sphere.position.y, sphere.position.z );
            //pointLight.intensity = 0.2;
            this.scene.add( pointLight );
            
        }
        //bloomComposer.render();
    
    }

        
    
        //render();
    
    
}

export { BloomGen };