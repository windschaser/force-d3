import * as d3 from "d3";
import * as THREE from 'three';
import DragControls from 'three-dragcontrols';

const TrackballControls = require('three-trackballcontrols');

// (() => {
// 	console.log(d3.version);
// 	let width = 800;
// 	let height = 600;
// 	let svg = d3.select("body").append('svg').style('width', `${width}px`).style('height', `${height}px`);
// 	let color = d3.scaleOrdinal(d3.schemeCategory10);
//
// 	let nodes = [{name: "桂林"}, {name: "广州"},
// 		{name: "厦门"}, {name: "杭州"},
// 		{name: "上海"}, {name: "青岛"},
// 		{name: "天津"}];
//
// 	let edges = [{source: 0, target: 1}, {source: 0, target: 2},
// 		{source: 0, target: 3}, {source: 1, target: 4},
// 		{source: 1, target: 5}, {source: 1, target: 6}];
//
// 	let simulation = d3.forceSimulation()
// 		.force("link", d3.forceLink().distance(100))
// 		.force("charge", d3.forceManyBody())
// 		.force("center", d3.forceCenter(width / 2, height / 2));
//
// 	let link = svg
// 		.selectAll("line")
// 		.data(edges)
// 		.enter().append("line")
// 		.style("stroke", "#ccc")
// 		.style("stroke-width", 1);
//
// 	let node = svg
// 		.selectAll("circle")
// 		.data(nodes)
// 		.enter().append("circle")
// 		.attr("r", 20)
// 		.style("fill", function (d, i) {
// 			return color(i);
// 		})
// 		.call(d3.drag()
// 			.on("start", dragstarted)
// 			.on("drag", dragged)
// 			.on("end", dragended));
//
// 	let svg_texts = svg.selectAll("text")
// 		.data(nodes)
// 		.enter()
// 		.append("text")
// 		.style("fill", "black")
// 		.attr("dx", 20)
// 		.attr("dy", 8)
// 		.text(function (d) {
// 			return d.name;
// 		});
//
// 	simulation.nodes(nodes)
// 		.on("tick", ticked)
// 		.force("link")
// 		.links(edges);
//
// 	function ticked()
// 	{
// 		link
// 			.attr("x1", function (d) {
// 				return d.source.x;
// 			})
// 			.attr("y1", function (d) {
// 				return d.source.y;
// 			})
// 			.attr("x2", function (d) {
// 				return d.target.x;
// 			})
// 			.attr("y2", function (d) {
// 				return d.target.y;
// 			});
//
// 		node
// 			.attr("cx", function (d) {
// 				return d.x;
// 			})
// 			.attr("cy", function (d) {
// 				return d.y;
// 			});
//
// 		svg_texts.attr("x", function (d) {
// 			return d.x;
// 		})
// 			.attr("y", function (d) {
// 				return d.y;
// 			});
// 	}
//
// 	function dragstarted(d)
// 	{
// 		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
// 		d.fx = d.x;
// 		d.fy = d.y;
// 	}
//
// 	function dragged(d)
// 	{
// 		d.fx = d3.event.x;
// 		d.fy = d3.event.y;
// 	}
//
// 	function dragended(d)
// 	{
// 		if (!d3.event.active) simulation.alphaTarget(0);
// 		d.fx = null;
// 		d.fy = null;
// 	}
// })();

(() => {
	let width = 1200;
	let height = 900;
	let color = d3.scaleOrdinal(d3.schemeCategory10);
	
	let nodes = [{name: "桂林"}, {name: "广州"},
		{name: "厦门"}, {name: "杭州"},
		{name: "上海"}, {name: "青岛"},
		{name: "天津"}];
	
	let edges = [{source: 0, target: 1}, {source: 0, target: 2},
		{source: 0, target: 3}, {source: 1, target: 4},
		{source: 1, target: 5}, {source: 1, target: 6}];
	
	let simulation = d3.forceSimulation()
		.force("link", d3.forceLink().distance(50))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(0, 0));
	
	simulation.nodes(nodes)
		.on("tick", ticked)
		.force("link")
		.links(edges);
	
	let scene = new THREE.Scene();
	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(width, height);
	renderer.shadowMapEnabled = true;
	renderer.setClearColor(0x333333, 1.0);
	document.body.appendChild(renderer.domElement);
	
	let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
	camera.position.set(0, 0, -300);
	camera.lookAt(0, 0, 0);
	
	let planeGeometry = new THREE.PlaneGeometry(300, 300, 10, 10);
	let planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
	let plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -1 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 50;
	plane.receiveShadow = true;
	scene.add(plane);
	let dragObjects = [];
	nodes.forEach((value, index) => {
		let canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "#000000";
		ctx.font = "50px Yahei";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(value.name, 128, 128, 256);
		let spriteMap = new THREE.CanvasTexture(canvas);
		spriteMap.needsUpdate = true;
		let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
		let sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(30, 30, 1);
		sprite.castShadow = true;
		sprite.receiveShadow = true;
		scene.add(sprite);
		//document.body.appendChild(canvas);
		let sphere_geometry = new THREE.SphereGeometry(10, 32, 32);
		let sphere_material = new THREE.MeshPhongMaterial({
			color: d3.rgb(color(index)).brighter().toString()
		});
		let sphere = new THREE.Mesh(sphere_geometry, sphere_material);
		sphere.castShadow = true;
		sphere.receiveShadow = true;
		scene.add(sphere);
		dragObjects.push(sphere);
		value.body = sphere;
		sphere.data = value;
		value.text = sprite;
		sprite.data = value;
	});
	
	edges.forEach((value => {
		let material = new THREE.LineBasicMaterial({vertexColors: true, linewidth: 50});
		let geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(-100, 50, 0));
		geometry.vertices.push(new THREE.Vector3(100, 0, 0));
		geometry.colors.push(new THREE.Color(color(value.source.index)), new THREE.Color(color(value.target.index)));
		let line = new THREE.Line(geometry, material);
		line.castShadow = true;
		line.receiveShadow = true;
		scene.add(line);
		value.body = line;
	}));
	
	let light = new THREE.AmbientLight(0xffffff, 0.5);
	light.position.set(0, 10, 0);
	scene.add(light);
	
	light = new THREE.SpotLight(0xffffff, 0.5);
	light.position.set(5, 5, -200);
	light.castShadow = true;
	light.shadow.mapSize.width = 8192;
	light.shadow.mapSize.height = 8192;
	scene.add(light);
	
	light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(-50, -50, 50);
	light.castShadow = true;
	//light.shadow.mapSize.width = 2048;
	//light.shadow.mapSize.height = 2048;
	scene.add(light);
	
	const traceballControls = new TrackballControls(camera, renderer.domElement);
	const dragControls = new DragControls(dragObjects, camera, renderer.domElement);
	dragControls.addEventListener('hoveron', function (event) {
		traceballControls.enabled = false;
	});
	dragControls.addEventListener('hoveroff', function (event) {
		traceballControls.enabled = true;
	});
	dragControls.addEventListener('dragstart', function (event) {
		simulation.alphaTarget(0.3).restart();
		//console.log(event.object);
	});
	dragControls.addEventListener('drag', function (event) {
		event.object.data.fx = event.object.position.x;
		event.object.data.fy = event.object.position.y;
	});
	dragControls.addEventListener('dragend', function (event) {
		//if (!d3.event.active) simulation.alphaTarget(0);
		event.object.data.fx = null;
		event.object.data.fy = null;
	});
	
	let animate = function () {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		traceballControls.update();
	};
	animate();
	
	function ticked()
	{
		nodes.forEach(value => {
			value.body.position.set(value.x, value.y, 0);
			value.text.position.set(value.x, value.y, -20);
		});
		edges.forEach(value => {
			value.body.geometry.verticesNeedUpdate = true;
			value.body.geometry.vertices[0] = new THREE.Vector3(value.source.x, value.source.y, 0);
			value.body.geometry.vertices[1] = new THREE.Vector3(value.target.x, value.target.y, 0);
		})
	}
})();