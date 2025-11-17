# rl-dart (Rocket-League: Directional-Air-Roll-Trainer)

A Rocket League air roll trainer and visualization tool. This project helps players practice and visualize air roll mechanics, featuring a customizable car model, ball, and camera system.

[Live demo](https://manrajpannu.github.io/rl-dart/)

## Community Discussion & Feedback

This project received a lot of positive feedback from the Rocket League community on Reddit:
- Shared on [r/RocketLeagueSchool](https://www.reddit.com/r/RocketLeagueSchool/comments/1ovdu2o/directional_air_roll_visualized_in_real_time/), the tool was praised for its usefulness in visualizing and practicing directional air roll in real time.
- Many users described it as "the single most incredible thing I've seen RL related in such a long time" and "amazing work."
- Players appreciated the ability to use both keyboard/mouse and controller, and the live browser demo.
- The project was compared to popular workshop maps and training tools, with users noting its unique real-time visualization and educational value.
- Community members shared their experiences switching from free air roll to directional air roll, and discussed the advantages for advanced mechanics.
- The post inspired other developers and content creators, with some planning to make videos or build similar tools.

Read the full discussion and feedback [here](https://www.reddit.com/r/RocketLeagueSchool/comments/1ovdu2o/directional_air_roll_visualized_in_real_time/).

## Features
- Real-time 3D visualization of car and ball using Three.js
- Directional air roll and rotation physics simulation
- Customizable car models (Octane, Fennec, Dominus, Lambo, Ball)
- Interactive camera controls and presets (ball cam, FOV, distance, height)
- lil-gui panel for live tweaking of physics, visuals, and camera
- Switch between rotation presets and car bodies instantly
- Visualize axis of rotation, forward direction, and helper torus
- Keyboard and controller support for all controls
- Adjustable game speed, drag coefficients, and rotation limits
- Ball chase, hit window, and timeout logic for realistic training

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

## Controls

### Keyboard
- W/S: Pitch (up/down)
- A/D: Yaw (left/right)
- Q: Air roll left
- E: Air roll right

### Controller
- Left joystick: Yaw (left/right) and Pitch (up/down)
- X, Y, A, B, LB, RB: Designated air roll

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/manrajpannu/rl-dart.git
   cd rl-dart
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

## Project Structure
```
rl-dart/
├── index.html
├── styles.css
├── src/
│   ├── main.js
│   ├── Car.js
│   ├── Ball.js
│   ├── Map.js
│   ├── Ui.js
│   └── ...
├── public/
│   └── models/
│       └── octane/
│           └── ...
├── package.json
└── README.md
```

## 3D Model Asset Licenses & Credits

This project uses several 3D models from Sketchfab. Please see below for license and credit information for each asset:

### Octane - Rocket League Car
This work is based on "Octane - Rocket League Car" (https://sketchfab.com/3d-models/octane-rocket-league-car-9910f0a5d158425bbc7deb60c7a81f69) by Jako (https://sketchfab.com/fairlight51) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

### Fennec - Rocket League Car
This work is based on "Fennec - Rocket League Car" (https://sketchfab.com/3d-models/fennec-rocket-league-car-5b43b50b6eeb4a12a29671df3418f57a) by Jako (https://sketchfab.com/fairlight51) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

### Dominus - Rocket League Car
This work is based on "Dominus - Rocket League Car" (https://sketchfab.com/3d-models/dominus-rocket-league-car-f592f249a65f41cd81a0e5aa3d418cb2) by Jako (https://sketchfab.com/fairlight51) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

### Ball - Rocket League
This work is based on "Ball - Rocket League" (https://sketchfab.com/3d-models/ball-rocket-league-2c8911aa1dcd4c53bad842f2d354dfe2) by Jako (https://sketchfab.com/fairlight51) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

### 2021 Lamborghini Countach LPI 800-4
This work is based on "2021 Lamborghini Countach LPI 800-4" (https://sketchfab.com/3d-models/2021-lamborghini-countach-lpi-800-4-d76b94884432422b966d1a7f8815afb5) by Lexyc16 (https://sketchfab.com/Lexyc16) licensed under CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)

## License
MIT
