export class Greetigs {
    constructor(name) {
        this.greeting = "Hello";
        this.name = name ? name : "Guest";
    }
    greet() {
        return `${this.greeting}, ${this.name}! Welcome to TaskHub`;
    }

}