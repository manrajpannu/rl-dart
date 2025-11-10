# rl-dart (Rocket-League: Directional-Air-roll-Trainer)

A Rocket League air roll trainer and visualization tool. This project helps players practice and visualize air roll mechanics, featuring a customizable car model, ball, and camera system.

## Features
- 3D car and ball visualization using Three.js
- Air roll and rotation physics simulation
- Customizable car models (Octane, Fennec, etc.)
- Camera controls and presets
- lil-gui for live parameter tweaking
- Stats panel for performance monitoring

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/rocketcar.git
   cd rocketcar
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running Locally
Start the development server:
```sh
npx vite
```
Open your browser to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

## Usage
- Use the lil-gui panel (top-right) to tweak car, ball, and camera parameters.
- Use keyboard controls to move and rotate the car.
- Switch car models and presets via the UI.
- Monitor performance with the stats panel (top-left).

## UI Features & Controls

The lil-gui panel (top-right) provides live controls for the following features:

| Feature                | Description |
|------------------------|-------------|
| **Game Speed**         | Adjusts the speed of the physics simulation. |
| **Show Forward Axis**  | Toggles a line showing the car's forward direction. |
| **Show Axis of Rotation** | Displays the current axis of rotation for the car. |
| **Show Helper Donut**  | Shows a torus visualizing the axis of rotation. |
| **Car Body**           | Switches between available car models (e.g., Octane, Fennec). |
| **Rotation Preset**    | Selects between rotation behavior presets (e.g., default, snappy). |
| **Rotation Speed**     | Sets the car's rotation speed. |
| **Air Drag Coefficient** | Adjusts rotational drag (higher = slower rotation decay). |
| **Max Rotation Speed** | Limits the maximum rotation speed. |
| **Ball Scale**         | Changes the size of the ball. |
| **Hit Window Duration**| Sets the time window for ball hit detection. |
| **Timeout**            | Enables/disables ball timeout logic. |
| **Chase Timeout**      | Sets the chase timeout duration for the ball. |
| **Ball Camera**        | Toggles camera to follow the ball or car. |
| **Field of View**      | Adjusts camera FOV. |
| **Distance**           | Sets camera distance from the car. |
| **Height**             | Sets camera height above the car. |

You can interact with these controls to customize the simulation and visualization in real time.

## Project Structure
```
rocketcar/
├── index.html
├── styles.css
├── src/
│   ├── main.js
│   ├── Car.js
│   ├── Ball.js
│   ├── Map.js
│   ├── Ui.js
│   └── ...
├── resources/
│   └── models/
│       └── octane/
│           └── ...
├── package.json
└── README.md
```

## Credits
- [Three.js](https://threejs.org/) for 3D rendering
- [lil-gui](https://github.com/georgealways/lil-gui) for UI controls
- [Rocket League](https://www.rocketleague.com/) for inspiration

## License
MIT

---
If you enjoy this project, please star it on GitHub!
