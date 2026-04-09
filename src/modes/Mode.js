/**
 * Base gameplay mode contract.
 *
 * Subclasses are expected to:
 * - initialize or reset state in start(...)
 * - run per-frame logic in update(dt)
 * - release/disable mode behavior in stop()
 */
export class Mode {
  /**
   * @param {string} name Human-readable mode name.
   */
  constructor(name = "") {
    this.name = name;
    this.active = false;
  }

  /**
   * Activates this mode. Subclasses can extend to set up entities/state.
   */
  start() {
    this.active = true;
  }

  /**
   * Deactivates this mode.
   */
  stop() {
    this.active = false;
  }

  /**
   * Per-frame mode update.
   * @param {number} dt
   */
  update(dt) {
    // To be implemented by subclasses
  }

  /**
   * Optional reset hook for subclasses.
   */
  reset() {
    // To be implemented by subclasses
  }
}
