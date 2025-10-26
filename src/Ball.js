class Ball {
    constructor(radius) {
        this.radius = radius;
    }

    getArea() {
        return 4 * Math.PI * Math.pow(this.radius, 2);
    }

    getVolume() {
        return (4/3) * Math.PI * Math.pow(this.radius, 3);
    }
}
