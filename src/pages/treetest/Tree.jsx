import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Tree = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 씬 생성
    const scene = new THREE.Scene();

    // 카메라 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 렌더러 설정
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 큐브 생성
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // 언마운트 시 클린업
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Tree;
