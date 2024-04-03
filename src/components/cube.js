import { useEffect, useRef} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import modelUrl from '../allGrass/grassCube.glb';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export default function CubeComponent() {
    const modelRef = useRef(null);
    const rendererRef = useRef(null);
    const mouseDownRef = useRef(false);
    const previousMousePositionRef = useRef({ x: 0, y: 0 });
    const controlsRef = useRef(null);
    const audioRef = useRef(new Audio('/grass.wav'));
    const autoRotateRef = useRef(true);


    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        const rendererElement = renderer.domElement;
        document.querySelector('.App-header').appendChild(renderer.domElement);
        rendererRef.current = renderer;
        
        const loader = new GLTFLoader();
        loader.load(modelUrl, (gltf) => {
            document.querySelector('.App').style.backgroundImage = 'url("/grassland3.gif")';
            document.querySelector('.App').style.backgroundSize = 'cover';
            document.querySelector('.userHint').style.display = 'none';

            
            const model = gltf.scene;
            modelRef.current = model;

            model.rotation.x = Math.PI / 4;

            scene.add(model);

            autoRotateRef.current = true;

            model.position.set(0, 0, 0);

            const scaleFactor = 0.8;
            model.scale.set(scaleFactor, scaleFactor, scaleFactor);

            if (autoRotateRef.current === null || autoRotateRef.current === true) {
                
                autoRotateRef.current = true;
            }

        });

        const ambientLight = new THREE.AmbientLight(0xffffff); // Soft white light
        ambientLight.intensity = 4;
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0); // Position the light
        scene.add(directionalLight);

        camera.position.z = 5;

        const handleMouseEnter = () => {
            console.log("i am in");

            audioRef.current.volume = 0.8;
            audioRef.current.play();
            autoRotateRef.current = false; // Stop auto rotation when mouse enters the scene
           
        };

        const handleMouseLeave = () => {
            console.log("i am out");     
            audioRef.current.pause();
            audioRef.current.currentTime = 0; 
            autoRotateRef.current = true; // Resume auto rotation when mouse leaves the scene
           
        };

        rendererElement.addEventListener('mouseenter', handleMouseEnter);
        rendererElement.addEventListener('mouseleave', handleMouseLeave);

        const controls = new OrbitControls(camera, rendererElement);
        controlsRef.current = controls;

        const handleMouseDown = (event) => {
            mouseDownRef.current = true;
            previousMousePositionRef.current.x = event.clientX;
            previousMousePositionRef.current.y = event.clientY;
        };

        const handleMouseUp = () => {
            mouseDownRef.current = false;
        };

        const handleMouseMove = (event) => {
            if (mouseDownRef.current && modelRef.current) {
                const currentMousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };

                const deltaX = currentMousePosition.x - previousMousePositionRef.current.x;
                const deltaY = currentMousePosition.y - previousMousePositionRef.current.y;

                camera.rotation.y += deltaX ;
                camera.rotation.x += deltaY ;

                previousMousePositionRef.current = currentMousePosition;
            }
        };

        rendererElement.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            if (autoRotateRef.current && modelRef.current) {
                // Rotate the cube automatically if autoRotateRef is true
                modelRef.current.rotation.y += 0.009;
            }
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Cleanup function

            document.querySelector('.App').style.backgroundImage = 'url("/vivid-blurred-colorful-wallpaper-background.jpg")';
            document.querySelector('.App').style.backgroundSize = 'cover';

            const parent = rendererElement.parentElement;
            parent.removeChild(rendererElement);
            rendererRef.current.dispose();
            if (modelRef.current) {
                scene.remove(modelRef.current);

            }
            if (controlsRef.current) {
                controlsRef.current.dispose(); // Dispose controls
            }

            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, []);

     
    return null; // This component doesn't render anything directly
}