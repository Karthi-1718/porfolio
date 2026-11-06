import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  webGLSupported = true;
  private renderer: any;
  private scene: any;
  private camera: any;
  private animationId: number | null = null;
  private particles: any;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.initThreeJS(), 100);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser || !this.renderer || !this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private async initThreeJS(): Promise<void> {
    // Check WebGL support
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      this.webGLSupported = false;
      return;
    }

    try {
      const THREE = await import('three');

      // Scene
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 30;

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x1a1a4e, 2);
      this.scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x3b82f6, 8, 80);
      pointLight1.position.set(15, 20, 15);
      this.scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x7c3aed, 6, 60);
      pointLight2.position.set(-15, -10, 10);
      this.scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0x06b6d4, 4, 50);
      pointLight3.position.set(0, -20, 5);
      this.scene.add(pointLight3);

      // Create floating particles
      this.createParticles(THREE);

      // Create floating geometric shapes
      this.createGeometricShapes(THREE);

      // Start animation loop
      this.animate();
    } catch (err) {
      console.error('Three.js initialization failed:', err);
      this.webGLSupported = false;
    }
  }

  private createParticles(THREE: any): void {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const color1 = new THREE.Color(0x3b82f6);
    const color2 = new THREE.Color(0x7c3aed);
    const color3 = new THREE.Color(0x06b6d4);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const rnd = Math.random();
      let col = rnd < 0.5 ? color1 : rnd < 0.75 ? color2 : color3;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 2.5 + 0.3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private createGeometricShapes(THREE: any): void {
    const shapes = [
      { geo: new THREE.OctahedronGeometry(2, 0), pos: [-18, 8, -10], color: 0x3b82f6 },
      { geo: new THREE.TetrahedronGeometry(1.5, 0), pos: [18, -6, -8], color: 0x7c3aed },
      { geo: new THREE.IcosahedronGeometry(1.2, 0), pos: [-10, -12, -5], color: 0x06b6d4 },
      { geo: new THREE.OctahedronGeometry(1, 0), pos: [14, 14, -12], color: 0xa78bfa },
      { geo: new THREE.TetrahedronGeometry(0.8, 0), pos: [0, -16, -6], color: 0x60a5fa },
    ];

    shapes.forEach(({ geo, pos, color }) => {
      const mat = new THREE.MeshPhongMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      this.scene.add(mesh);
    });
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    // Smooth mouse follow
    this.targetX += (this.mouseX - this.targetX) * 0.03;
    this.targetY += (this.mouseY - this.targetY) * 0.03;

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.y = time * 0.03 + this.targetX * 0.3;
      this.particles.rotation.x = time * 0.015 + this.targetY * 0.15;
    }

    // Animate geometric shapes
    this.scene?.children?.forEach((child: any) => {
      if (child.type === 'Mesh') {
        child.rotation.x = time * 0.3;
        child.rotation.y = time * 0.5;
        child.position.y += Math.sin(time + child.position.x) * 0.003;
      }
    });

    // Camera parallax
    this.camera.position.x += (this.targetX * 2 - this.camera.position.x) * 0.03;
    this.camera.position.y += (-this.targetY * 2 - this.camera.position.y) * 0.03;

    this.renderer?.render(this.scene, this.camera);
  }

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollDown(): void {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer?.dispose();
  }
}
