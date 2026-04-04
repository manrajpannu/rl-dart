export class Mode {
  constructor(name = "") {
    this.name = name;
    this.active = false;
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  update(dt) {
    // To be implemented by subclasses
  }

  reset() {
    // To be implemented by subclasses
  }
}
