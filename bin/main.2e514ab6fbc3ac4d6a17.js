/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_dragcontrols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three-dragcontrols */ "./node_modules/three-dragcontrols/lib/index.module.js");




const TrackballControls = __webpack_require__(/*! three-trackballcontrols */ "./node_modules/three-trackballcontrols/index.js");

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
	let color = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_0__["schemeCategory10"]);
	
	let nodes = [{name: "桂林"}, {name: "广州"},
		{name: "厦门"}, {name: "杭州"},
		{name: "上海"}, {name: "青岛"},
		{name: "天津"}];
	
	let edges = [{source: 0, target: 1}, {source: 0, target: 2},
		{source: 0, target: 3}, {source: 1, target: 4},
		{source: 1, target: 5}, {source: 1, target: 6}];
	
	let simulation = d3__WEBPACK_IMPORTED_MODULE_0__["forceSimulation"]()
		.force("link", d3__WEBPACK_IMPORTED_MODULE_0__["forceLink"]().distance(50))
		.force("charge", d3__WEBPACK_IMPORTED_MODULE_0__["forceManyBody"]())
		.force("center", d3__WEBPACK_IMPORTED_MODULE_0__["forceCenter"](0, 0));
	
	simulation.nodes(nodes)
		.on("tick", ticked)
		.force("link")
		.links(edges);
	
	let scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
	let renderer = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]({antialias: true});
	renderer.setSize(width, height);
	renderer.shadowMapEnabled = true;
	renderer.setClearColor(0x333333, 1.0);
	document.body.appendChild(renderer.domElement);
	
	let camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](45, width / height, 1, 1000);
	camera.position.set(0, 0, -300);
	camera.lookAt(0, 0, 0);
	
	let planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["PlaneGeometry"](300, 300, 10, 10);
	let planeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__["MeshStandardMaterial"]({color: 0xFFFFFF, side: three__WEBPACK_IMPORTED_MODULE_1__["DoubleSide"]});
	let plane = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](planeGeometry, planeMaterial);
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
		let spriteMap = new three__WEBPACK_IMPORTED_MODULE_1__["CanvasTexture"](canvas);
		spriteMap.needsUpdate = true;
		let spriteMaterial = new three__WEBPACK_IMPORTED_MODULE_1__["SpriteMaterial"]({map: spriteMap});
		let sprite = new three__WEBPACK_IMPORTED_MODULE_1__["Sprite"](spriteMaterial);
		sprite.scale.set(30, 30, 1);
		sprite.castShadow = true;
		sprite.receiveShadow = true;
		scene.add(sprite);
		//document.body.appendChild(canvas);
		let sphere_geometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereGeometry"](10, 32, 32);
		let sphere_material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
			color: d3__WEBPACK_IMPORTED_MODULE_0__["rgb"](color(index)).brighter().toString()
		});
		let sphere = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](sphere_geometry, sphere_material);
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
		let material = new three__WEBPACK_IMPORTED_MODULE_1__["LineBasicMaterial"]({vertexColors: true, linewidth: 50});
		let geometry = new three__WEBPACK_IMPORTED_MODULE_1__["Geometry"]();
		geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](-100, 50, 0));
		geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](100, 0, 0));
		geometry.colors.push(new three__WEBPACK_IMPORTED_MODULE_1__["Color"](color(value.source.index)), new three__WEBPACK_IMPORTED_MODULE_1__["Color"](color(value.target.index)));
		let line = new three__WEBPACK_IMPORTED_MODULE_1__["Line"](geometry, material);
		line.castShadow = true;
		line.receiveShadow = true;
		scene.add(line);
		value.body = line;
	}));
	
	let light = new three__WEBPACK_IMPORTED_MODULE_1__["AmbientLight"](0xffffff, 0.5);
	light.position.set(0, 10, 0);
	scene.add(light);
	
	light = new three__WEBPACK_IMPORTED_MODULE_1__["SpotLight"](0xffffff, 0.5);
	light.position.set(5, 5, -200);
	light.castShadow = true;
	light.shadow.mapSize.width = 8192;
	light.shadow.mapSize.height = 8192;
	scene.add(light);
	
	light = new three__WEBPACK_IMPORTED_MODULE_1__["DirectionalLight"](0xffffff, 0.5);
	light.position.set(-50, -50, 50);
	light.castShadow = true;
	//light.shadow.mapSize.width = 2048;
	//light.shadow.mapSize.height = 2048;
	scene.add(light);
	
	const traceballControls = new TrackballControls(camera, renderer.domElement);
	const dragControls = new three_dragcontrols__WEBPACK_IMPORTED_MODULE_2__["default"](dragObjects, camera, renderer.domElement);
	dragControls.addEventListener('hoveron', function (event) {
		traceballControls.enabled = false;
	});
	dragControls.addEventListener('hoveroff', function (event) {
		traceballControls.enabled = true;
	});
	dragControls.addEventListener('dragstart', function (event) {
		//simulation.alphaTarget(0.3).restart();
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
			value.body.geometry.vertices[0] = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](value.source.x, value.source.y, 0);
			value.body.geometry.vertices[1] = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](value.target.x, value.target.y, 0);
		})
	}
})();

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

/******/ });
//# sourceMappingURL=main.2e514ab6fbc3ac4d6a17.js.map