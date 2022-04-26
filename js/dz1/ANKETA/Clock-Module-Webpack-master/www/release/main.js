import {Model} from "./TClock.js";
import {View} from "./TClockViewDOM.js";
import {Controller} from "./TClockControllerButtons.js";
new Controller(
    new Model(0),
    new View(document.body));
new Controller(
    new Model(-5),
    new View(document.body));
new Controller(
    new Model(1),
    new View(document.body));
new Controller(
    new Model(3),
    new View(document.body));
new Controller(
    new Model(9),
    new View(document.body));
new Controller(
    new Model(10),
    new View(document.body));
