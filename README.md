# Promptedsite — 3D Studio & Product Configurators

Real-time 3D web systems for luxury product visualization, bespoke configurators, and personalization. Built once, integrated seamlessly into any e-commerce storefront, and completely self-hosted.

## Architecture & Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **3D Graphics Engine**: Three.js WebGL 2.0 with ACES Filmic tone mapping and PBR metallic-roughness shaders
- **Smooth Inertia Scrolling**: Lenis
- **Typography**: Archivo Variable Typography
- **Iconography**: Lucide React

## Interactive Capabilities

1. **Full-Featured 3D Product Configurator**:
   - Real-time WebGL rendering with OrbitControls, auto-orbit, wireframe toggles, and camera reset.
   - 7 Photorealistic product categories:
     - **Luggage**: High-grade aluminum shell finishes, corner reinforcement, and interior hardware.
     - **Footwear**: Fine calfskin, cordovan, and stitched sole details.
     - **Configurable Chairs**: Over 432 ergonomic variant combinations.
     - **Leather Goods**: Bespoke leather grains, stitching, and hardware clasps.
     - **Lounge Furniture**: High-poly upholstered fabric and spatial AR readiness.
     - **Bottles & Tumblers**: Powder-coated finishes and live custom engraving text.
     - **Fine Jewellery**: Sub-surface reflection and diamond dispersion facets.
   - Dynamic Price Engine that recalculates totals live as finishes and specifications are selected.

2. **Unified Digital Twin Workflow**:
   - Interactive 3-stage breakdown demonstrating digital twin creation, e-commerce storefront embed, and automated factory build sheet generation.

3. **Parametric Sizing & Blueprint Engine**:
   - Real-time interactive sliders adjusting width, depth, and height with dynamic volumetric calculations and isometric SVG blueprint updates.

4. **Performance & Speed Benchmarks**:
   - Technical comparison demonstrating 0.3s DRACO-compressed asset streaming versus typical 5s+ third-party SaaS iframes.

5. **Curated Case Studies**:
   - High-fidelity showcases for Globe-Trotter, Grau, Baragoni, and Dozze.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
