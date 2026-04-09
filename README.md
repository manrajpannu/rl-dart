# rl-dart (Rocket-League: Directional-Air-Roll-Trainer)

A Rocket League air roll trainer and visualization tool. This project helps players practice and visualize air roll mechanics, featuring a customizable car model, ball, and camera system.

[Live demo](https://manrajpannu.github.io/rl-dart/)

https://github.com/user-attachments/assets/6278cd9b-d782-4125-8ba6-1a806838323a

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

## Architecture Overview

The app uses a fixed-step simulation driven by the render loop in [src/main.js](src/main.js):

1. Frame time is measured and scaled by `physics.world.gameSpeed`.
2. Time is accumulated into an accumulator.
3. The engine is updated in fixed `FIXED_DT` steps (`1 / 136`) while enough time is available.
4. The scene is rendered once per browser frame.

This separates simulation stability from monitor refresh rate and keeps control/physics behavior consistent.

Core runtime orchestration lives in [src/Engine.js](src/Engine.js). Per fixed update it:

1. Reads normalized controls from [src/Controller.js](src/Controller.js).
2. Updates ball interactions through [src/Ball/BallManager.js](src/Ball/BallManager.js).
3. Applies car rotation/boost in [src/Car/Car.js](src/Car/Car.js).
4. Updates camera target and smoothing.
5. Advances active mode logic (`Freeplay` or `Challenge`).

## Gameplay Mechanics

### Ball Targeting and Damage

Ball hit detection is ray-based. The car provides a forward ray and the ball system computes intersections each fixed update.

Important rule: only the first ball intersected by the ray can be damaged in that frame.

- [src/Ball/BallManager.js](src/Ball/BallManager.js) finds the nearest intersection (`findFirstIntersectedBall`) and passes a hit gate into each ball update.
- [src/Ball/Ball.js](src/Ball/Ball.js) respects that gate (`canBeHit`) so non-front balls are ignored for damage even if they are also intersected.

### Health, Hit Rate, and Respawn

- Balls can have health (`maxHealth`, current `health`, `damageAmount`).
- Damage is rate-limited per ball using DPS timing (`hitAccumulator`).
- When health reaches zero, kill events are emitted and the ball is respawned/reset.

### Modes

- Freeplay ([src/modes/Freeplay.js](src/modes/Freeplay.js)): endless training with score counters.
- Challenge ([src/modes/ChallengeMode.js](src/modes/ChallengeMode.js)): adds countdown + time limit on top of freeplay behavior.
- Base mode contract is in [src/modes/Mode.js](src/modes/Mode.js) (`start`, `update`, `stop`).

### Tuning

Gameplay and camera tuning are centralized in [src/physicsConfig.js](src/physicsConfig.js):

- `physics.car`: rotation speed, drag, max speed, helper scale
- `physics.camera`: FOV and chase camera framing
- `physics.ball`: trainer targeting/chase settings
- `physics.world`: global simulation speed

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
- X: Air roll left
- Y: Air roll right

## Community Discussion & Feedback

This project received a lot of positive feedback from the Rocket League community on Reddit:
- Shared on [r/RocketLeagueSchool](https://www.reddit.com/r/RocketLeagueSchool/comments/1ovdu2o/directional_air_roll_visualized_in_real_time/), the tool was praised for its usefulness in visualizing and practicing directional air roll in real time.
- Many users described it as "the single most incredible thing I've seen RL related in such a long time" and "amazing work."

Read the full discussion and feedback [here](https://www.reddit.com/r/RocketLeagueSchool/comments/1ovdu2o/directional_air_roll_visualized_in_real_time/).

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

## License
MIT
