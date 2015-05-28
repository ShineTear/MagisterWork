	var scene = new THREE.Scene();


var renderer;
var clock = new THREE.Clock();
var MARGIN = 0;
			var SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
			var SCREEN_WIDTH  = window.innerWidth;
var camera;
var container;
var controls;
var mouseControls;
var mouseControlsFlag; //1 - сейчас orbit, 0 - fly
var geometry;
var material;
var cube;
init();
render();
rend();

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	container = document.createElement( 'div' );
				document.body.appendChild( container );
								
	mouseControls = new THREE.OrbitControls( camera );
	mouseControls.damping = 0.2;
	mouseControls.addEventListener( 'change', rend );
	mouseControlsFlag = 1;
	
				
	renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );
geometry = new THREE.BoxGeometry( 1, 1, 1 );
material =  new THREE.MeshNormalMaterial( )  ;//new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
scene.add( cube );

geometry = new THREE.BoxGeometry( 1, 1, 1 );
material =  new THREE.MeshNormalMaterial( )  ;//new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
cube.position.set( 10, 10, 0 );
scene.add( cube );

var line_material = new THREE.LineBasicMaterial( { color: 0x303030 } ),
					geometry = new THREE.Geometry(),
					floor = -75, step = 25;

				for ( var i = 0; i <= 40; i ++ ) {

					geometry.vertices.push( new THREE.Vector3( - 500, floor, i * step - 500 ) );
					geometry.vertices.push( new THREE.Vector3(   500, floor, i * step - 500 ) );

					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor, -500 ) );
					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor,  500 ) );

				}

				var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
				scene.add( line );

var line_material = new THREE.LineBasicMaterial( { color: 0x330000 } ),
					geometry = new THREE.Geometry(),
					floor = 75, step = 25;

				for ( var i = 0; i <= 40; i ++ ) {

					geometry.vertices.push( new THREE.Vector3( - 500, floor, i * step - 500 ) );
					geometry.vertices.push( new THREE.Vector3(   500, floor, i * step - 500 ) );

					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor, -500 ) );
					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor,  500 ) );

				}

				var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
				scene.add( line );
				
camera.position.z = 5;
				
}

function changeTarget(){
	if (mouseControlsFlag == 0)			{
		controls.stop();
		mouseControls = new THREE.OrbitControls( camera );
		mouseControls.damping = 0.2;
		mouseControls.addEventListener( 'change', rend );
		mouseControlsFlag = 1;
	}
	else{
		mouseControls.stop();
		controls = new THREE.FlyControls( camera );
		controls.movementSpeed = 10;
		//controls.domElement = container;
		controls.rollSpeed = Math.PI / 24;
		controls.autoForward = false;
		controls.dragToLook = false;
		mouseControlsFlag = 0;
	}
}

 function onKeyDown( event ) {
	switch ( event.keyCode ) {

			 case 13:
				 changeTarget();
				 break;
	}
 }
this.addEventListener( 'keydown', onKeyDown, false );
function render() {
	if (mouseControlsFlag == 0){
		requestAnimationFrame( render );
		var delta = clock.getDelta();
		controls.update( delta );
	}

	renderer.clear();
	renderer.render( scene, camera );
}

function rend() {
	renderer.clear();
	renderer.render( scene, camera );
}