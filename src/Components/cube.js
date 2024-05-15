import {useEffect, useRef, useState} from 'react';
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
    const [initialized, setInitialized] = useState(false);


    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        const rendererElement = renderer.domElement;
        document.querySelector('.weatherDisplay').appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const loader = new GLTFLoader();
        loader.load(modelUrl, (gltf) => {


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

        const handleClick = () => {
            if (audioRef.current) {
                console.log("I am clicked real hard");
                audioRef.current.volume = 1;
                audioRef.current.play().catch(error => {
                    console.error("Failed to play audio:", error);
                });
                autoRotateRef.current = false;
            }

            const username = localStorage.getItem('username') || 'Sweccer';
            const message = `${username} has touched some grass today!`;

            fetch('http://localhost:3001/send-discord-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        console.log('Message sent successfully to Discord');
                    } else {
                        console.log('Failed to send message to Discord');
                    }
                })
                .then(data => console.log('Message sent successfully to Discord', data))
                .catch(error => {
                    console.error('Error sending message to Discord:', error);
                });
        };

        const handleMouseLeave = () => {
            console.log("i am out");
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                autoRotateRef.current = true;
            }
        };

        rendererElement.addEventListener('click', handleClick);
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

            if (autoRotateRef.current === true && modelRef.current) {
                modelRef.current.rotation.y += 0.009;
            }
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Cleanup function

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


    return null;
}