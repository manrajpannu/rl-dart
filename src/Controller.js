// Deadzone helper


/**
 * Applies independent axis deadzone clipping.
 * @param {number} value
 * @param {number} deadzone
 * @returns {number}
 */
const crossDeadzone = (value, deadzone = 0.10) => {
  return Math.abs(value) < deadzone ? 0 : value;
};

/**
 * Applies radial deadzone clipping in stick space.
 * @param {number} x
 * @param {number} y
 * @param {number} deadzone
 * @returns {{ x: number, y: number }}
 */
const circleDeadzone = (x, y, deadzone = 0.10) => {
  return Math.hypot(x, y) < deadzone ? { x: 0, y: 0 } : { x, y };
};

/**
 * Remaps circular stick input domain to square domain.
 * This preserves edge reach when users prefer square deadzone behavior.
 * @param {number} x
 * @param {number} y
 * @returns {{ x: number, y: number }}
 */
function circleToSquare(x, y) {
  if (x === 0 && y === 0) return { x: 0, y: 0 }; // center
  const r = Math.hypot(x, y);           // sqrt(x*x + y*y)
  const cosT = x / r;
  const sinT = y / r;
  const m = Math.max(Math.abs(cosT), Math.abs(sinT));
  // scale so circle edge maps to square edge
  const scale = (m === 0) ? 0 : r / m;
  return { x: cosT * scale, y: sinT * scale };
}

/**
 * Aggregates keyboard/mouse/gamepad state into normalized control outputs.
 */
export class Controller {
    constructor() {

      this.input = {
        yawLeft: 0,
        yawRight: 0,
        pitchUp: 0,
        pitchDown: 0,
        rollLeft: 0,
        rollRight: 0,
        shiftHeld: false,
      };
      
      this.controllerDeadzone = 0.15;
      this.controllerDeadzoneType = 'cross'; 
      this.controllerSensitivity = 1.0;
      this.gamepadIndex = null;
      this.ballCam = true;
      
      window.addEventListener('gamepadconnected', (e) => this.gamepadIndex = e.gamepad.index);
      window.addEventListener('gamepaddisconnected', (e) => {if (this.gamepadIndex === e.gamepad.index) this.gamepadIndex = null});
      this.airRollLeftButton = 2; // Default X
      this.airRollRightButton = 3; // Default Y
      this.airRollFreeButton = 0; // Default A
      this.boostButton = 4; // Default LB
      
      this.leftMouse = false;
      document.addEventListener("keydown", (e) => this.handleKey(e.code, true));
      document.addEventListener("keyup", (e) => this.handleKey(e.code, false));
      window.addEventListener("mousedown", (e) => {
          if (e.button === 0) this.leftMouse = true;
      });
      window.addEventListener("mouseup", (e) => {
          if (e.button === 0) this.leftMouse = false;
      });
    }

    isLeftMouse() {
        return this.leftMouse;
    }

    handleKey(code, isDown) {
      if (code === "ShiftLeft" || code === "ShiftRight") {
          this.input.shiftHeld = isDown;
          // Instantly switch roll/yaw when shift is pressed or released
          if (!isDown) {
          // Shift released: if A/D held, switch roll to yaw
          if (this.input.rollLeft) {
              this.input.rollLeft = 0;
              if (this.input.aHeld) this.input.yawRight = 1;
          }
          if (this.input.rollRight) {
              this.input.rollRight = 0;
              if (this.input.dHeld) this.input.yawLeft = 1;
          }
          } else {
          // Shift pressed: if A/D held, switch yaw to roll
          if (this.input.yawRight) {
              this.input.yawRight = 0;
              if (this.input.aHeld) this.input.rollLeft = 1;
          }
          if (this.input.yawLeft) {
              this.input.yawLeft = 0;
              if (this.input.dHeld) this.input.rollRight = 1;
          }
          }
          return;
      }
      switch (code) {
          case "KeyA":
          this.input.aHeld = isDown;
          if (this.input.shiftHeld) {
              this.input.rollLeft = isDown ? 1 : 0;
              if (isDown) this.input.yawRight = 0;
          } else {
              this.input.yawRight = isDown ? 1 : 0;
          }
          break;
          case "KeyD":
          this.input.dHeld = isDown;
          if (this.input.shiftHeld) {
              this.input.rollRight = isDown ? 1 : 0;
              if (isDown) this.input.yawLeft = 0;
          } else {
              this.input.yawLeft = isDown ? 1 : 0;
          }
          break;
          case "KeyW":
          this.input.pitchDown = isDown ? 1 : 0;
          break;
          case "KeyS":
          this.input.pitchUp = isDown ? 1 : 0;
          break;
          case "ArrowUp":
          this.input.pitchDown = isDown ? 1 : 0;
          break;
          case "ArrowDown":
          this.input.pitchUp = isDown ? 1 : 0;
          break;
          case "KeyQ":
          this.input.rollLeft = isDown ? 1 : 0;
          break;
          case "KeyE":
          this.input.rollRight = isDown ? 1 : 0;
          break;
          case "ArrowLeft":
          this.input.rollLeft = isDown ? 1 : 0;
          break;
          case "ArrowRight":
          this.input.rollRight = isDown ? 1 : 0;
          break;
          case "Space":
          if (isDown) this.ballCam = !this.ballCam;
          break;
      }
    }

    /**
     * Reads current input sources and returns one merged control frame.
     * Keyboard input has priority over gamepad on each axis when non-zero.
     *
     * @returns {{ pitch: number, yaw: number, roll: number, boostHeld: boolean, ballCam: boolean }}
     */
    _clampStick(x, y) {
      const hyp = Math.hypot(x, y);
      if (hyp > 1) {
        return { x: x / hyp, y: y / hyp };
      }
      return { x, y };
    }

    _applyStickDeadzone(gp) {
      let x = gp.axes[0];
      let y = gp.axes[1];

      switch (this.controllerDeadzoneType) {
        case 'circle': {
          ({ x, y } = circleDeadzone(x, y, this.controllerDeadzone));
          x *= this.controllerSensitivity;
          y *= this.controllerSensitivity;
          return this._clampStick(x, y);
        }

        case 'cross': {
          x = crossDeadzone(x, this.controllerDeadzone);
          y = crossDeadzone(y, this.controllerDeadzone);
          x *= this.controllerSensitivity;
          y *= this.controllerSensitivity;
          return this._clampStick(x, y);
        }

        case 'square': {
          x = crossDeadzone(gp.axes[0], this.controllerDeadzone);
          y = crossDeadzone(gp.axes[1], this.controllerDeadzone);
          return circleToSquare(x * this.controllerSensitivity, y * this.controllerSensitivity);
        }

        default: {
          x = crossDeadzone(x, this.controllerDeadzone);
          y = crossDeadzone(y, this.controllerDeadzone);
          return { x, y };
        }
      }
    }

    _readGamepadFrame() {
      let pitch = 0;
      let yaw = 0;
      let roll = 0;
      let boostHeld = false;

      if (this.gamepadIndex === null) {
        return { pitch, yaw, roll, boostHeld };
      }

      const gp = navigator.getGamepads()[this.gamepadIndex];
      if (!gp || !gp.connected) {
        return { pitch, yaw, roll, boostHeld };
      }

      const { x, y } = this._applyStickDeadzone(gp);
      pitch = THREE.MathUtils.clamp(y, -1, 1);
      yaw = -THREE.MathUtils.clamp(x, -1, 1);

      const leftPressed = gp.buttons[this.airRollLeftButton]?.pressed;
      const rightPressed = gp.buttons[this.airRollRightButton]?.pressed;
      const freePressed = gp.buttons[this.airRollFreeButton]?.pressed;
      boostHeld = gp.buttons[this.boostButton]?.pressed;

      if (freePressed) {
        roll = -yaw;
        yaw = 0;
      } else if (leftPressed) {
        roll = -1;
      } else if (rightPressed) {
        roll = 1;
      }

      return { pitch, yaw, roll, boostHeld };
    }

    _applyKeyboardOverrides(frame) {
      return {
        pitch: (this.input.pitchUp - this.input.pitchDown) || frame.pitch,
        yaw: (this.input.yawRight - this.input.yawLeft) || frame.yaw,
        roll: (this.input.rollRight - this.input.rollLeft) || frame.roll,
        boostHeld: this.leftMouse || frame.boostHeld,
        ballCam: this.ballCam,
      };
    }

    handleController() {
      const gamepadFrame = this._readGamepadFrame();
      return this._applyKeyboardOverrides(gamepadFrame);
    }
}