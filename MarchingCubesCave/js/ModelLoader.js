import * as THREE from 'three';

import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';

export class ModelLoader{
    ModelLoader(){
        
    }

    loadModel(group, modelLocation, materialLocation, translation, rotation, scale){
        var returnObject = new THREE.Mesh( new THREE.BoxGeometry());
        var mtlload=new MTLLoader();
        mtlload.setPath( 'models/' )
        mtlload.load( materialLocation, function ( materials ) 
        {
            materials.preload();
            var objload=new OBJLoader();
            objload.setMaterials( materials )
            objload.setPath( 'models/' )
            objload.load( modelLocation, function ( object ) 
            {
                var box3 = new THREE.Box3();
                box3.setFromObject (object);
                var CenterBB= new THREE.Vector3();
                var SizeBB = new THREE.Vector3();
                box3.getCenter(CenterBB);
                box3.getSize(SizeBB);
                for ( var i = 0, l = object.children.length; i < l; i ++ ) 
                {
                    object.children[i].material.color= new THREE.Color(1,1,1);
                 }
                
                var sca = new THREE.Matrix4();
                var tra = new THREE.Matrix4();
                var combined = new THREE.Matrix4();
    
                sca.makeScale(5/SizeBB.length(),5/SizeBB.length(),5/SizeBB.length());
                tra.makeTranslation (-CenterBB.x,-CenterBB.y,-CenterBB.z);
                combined.multiply(sca);
                combined.multiply(tra);
                // combined.multiply(rotation);
                combined.multiply(translation);
                // combined.multiply(scale);
                
                object.applyMatrix4(combined);
                group.add(object);
                 
            });
        } );
        
    }
    
}