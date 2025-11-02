<script lang="ts">
	// https://github.com/3daddict/stl-viewer/ and https://tonybox.net/posts/simple-stl-viewer/ for stl viewer code

	import relativeDate from 'tiny-relative-date';
	import { SquarePen, Trash } from '@lucide/svelte';
	import * as THREE from 'three';
	import { STLLoader } from 'three/examples/jsm/Addons.js';
	import { OrbitControls } from 'three/examples/jsm/Addons.js';
	import { onMount } from 'svelte';

	let { devlog, projectId, showModifyButtons } = $props();

	// Necessary for camera/plane rotation
	let degree = Math.PI / 180;

	// Create scene
	const scene = new THREE.Scene();

	onMount(() => {
		if (!devlog.model) {
			return;
		}

		let canvas = document.querySelector(`#canvas-${devlog.id}`);

		if (!canvas) {
			return;
		}

		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true
		});

		renderer.setClearColor(0xffffff, 0);

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// There's no reason to set the aspect here because we're going
		// to set it every frame anyway so we'll set it to 2 since 2
		// is the the aspect for the canvas default size (300w/150h = 2)
		const camera = new THREE.PerspectiveCamera(40, 2, 1, 1000);
		camera.rotation.x = -45 * degree;

		// Add controls, targetting the same DOM element
		let controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 0, 0);
		controls.rotateSpeed = 0.5;
		controls.dampingFactor = 0.1;
		controls.enableDamping = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 4;
		controls.update();

		// Lighting
		const hemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.1);
		scene.add(hemisphere);

		const directional = new THREE.DirectionalLight(0xffffff, 1.1);
		directional.castShadow = true;
		directional.shadow.mapSize.width = 2048;
		directional.shadow.mapSize.height = 2048;
		scene.add(directional);

		const directional2 = new THREE.DirectionalLight(0xffffff, 1.1);
		directional2.castShadow = true;
		directional2.shadow.mapSize.width = 2048;
		directional2.shadow.mapSize.height = 2048;
		scene.add(directional2);

		function resizeCanvasToDisplaySize() {
			const canvas = renderer.domElement;
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			if (canvas.width !== width || canvas.height !== height) {
				// you must pass false here or three.js sadly fights the browser
				renderer.setSize(width, height, false);
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
			}
		}

		var meshMaterial = new THREE.MeshStandardMaterial({
			// transparent: true,
			opacity: 0.9,
			color: 0xb2a090,
			roughness: 0.5,
			flatShading: false
		});

		var loader = new STLLoader();
		console.log('model: ', devlog.model);

		var geometry = loader.load(
			devlog.model,
			function (geometry) {
				geometry.computeVertexNormals();

				const mesh = new THREE.Mesh(geometry, meshMaterial);

				mesh.name = 'loadedMeshObject';
				mesh.castShadow = true;
				mesh.receiveShadow = true;

				mesh.position.set(0, 0, 0);

				mesh.castShadow = true;
				mesh.receiveShadow = true;

				// Centre the mesh
				var middle = new THREE.Vector3();
				geometry.computeBoundingBox();

				var largestDimension = 1;

				if (geometry.boundingBox) {
					geometry.boundingBox.getCenter(middle);

					largestDimension = Math.max(
						geometry.boundingBox.max.x,
						geometry.boundingBox.max.y,
						geometry.boundingBox.max.z
					);
				}

				mesh.geometry.applyMatrix4(
					new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z)
				);

				mesh.rotation.x = THREE.MathUtils.degToRad(-90);
				mesh.rotation.z = THREE.MathUtils.degToRad(-25);

				const edges = new THREE.EdgesGeometry(geometry);
				// edges.scale(1.001, 1.001, 1.001);
				const lines = new THREE.LineSegments(
					edges,
					new THREE.LineBasicMaterial({
						color: 0xf3dcc6,
						linewidth: 1,
						polygonOffset: true,
						polygonOffsetFactor: -1,
						polygonOffsetUnits: -1
					})
				);

				lines.position.set(0, 0, 0);
				lines.rotation.x = THREE.MathUtils.degToRad(-90);
				lines.rotation.z = THREE.MathUtils.degToRad(-25);

				camera.position.z = largestDimension * 3;
				camera.position.y = largestDimension * 2;

				directional.position.set(largestDimension * 2, largestDimension * 2, largestDimension * 2);
				directional2.position.set(
					-largestDimension * 2,
					largestDimension * 2,
					-largestDimension * 2
				);

				scene.add(mesh);
				scene.add(lines);
			},
			(xhr) => {
				// TODO: loading slider
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			},
			(error) => {
				console.log(error);
			}
		);

		const animate = function () {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
			resizeCanvasToDisplaySize();
		};
		animate();
	});
</script>

<div
	class="relative flex flex-col border-3 border-dashed border-amber-900 bg-amber-950 p-3 shadow-lg/20 transition-all"
	id={`devlog-${devlog.id}`}
>
	<p class="mb-0.5 text-sm opacity-90">
		<abbr title={`${devlog.createdAt.toUTCString()}`}>
			{relativeDate(devlog.createdAt)}
		</abbr>
		∙ {devlog.timeSpent} minutes
	</p>
	<p>
		{devlog.description}
	</p>
	<div class="my-1 flex flex-col gap-3 lg:flex-row">
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<div
			class={`flex max-h-100 w-full grow flex-row justify-center border-3 border-amber-900 lg:w-auto ${devlog.model ? 'max-w-[55%]' : ''}`}
		>
			<img src={`${devlog.image}`} alt="Journal image" />
		</div>
		{#if devlog.model}
			<div class="max-h-100 w-100 grow border-3 border-amber-900 lg:max-w-[60%]">
				<canvas class="h-full w-full" id={`canvas-${devlog.id}`}></canvas>
			</div>
		{/if}
	</div>
	{#if showModifyButtons}
		<div class="mt-1 flex flex-row gap-1">
			<a
				href={`/dashboard/projects/${projectId}/devlog/${devlog.id}/edit`}
				class="flex cursor-pointer flex-row gap-1 bg-amber-800 p-1.5 text-xs outline-amber-50 transition-colors hover:bg-amber-700 hover:outline-2"
			>
				<SquarePen size={16} />
				Edit
			</a>
			<a
				href={`/dashboard/projects/${projectId}/devlog/${devlog.id}/delete`}
				class="flex cursor-pointer flex-row gap-1 bg-red-900 p-1.5 text-xs outline-red-50 transition-colors hover:bg-red-800 hover:outline-2"
			>
				<Trash size={16} />
				Delete
			</a>
		</div>
	{/if}
</div>
