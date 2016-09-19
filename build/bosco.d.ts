/**
 * Properties.ts
 *
 * Persist properties using LocalStorage
 *
 */
declare module bosco {
    /**
     * Properties
     *
     * persisted game settings and scores
     */
    class Properties {
        private static db;
        private static dbname;
        private static properties;
        /**
         * Initilize the properties
         *
         * @param name of property database
         * @param properties table of properties
         */
        static init(name: any, properties: any): void;
        static get(prop: any): any;
        static set: (prop: any, value: any) => void;
        /**
         * Set the Score
         *
         * @param score
         */
        static setScore(score: any): void;
        static getLeaderboard(count: any): any;
    }
}
declare module bosco.utils {
    /**
     * Input Controller
     */
    class Input {
        /** the input singleton */
        private static _input;
        /**
         * @returns the curent mouse position
         */
        static mousePosition: {
            x: number;
            y: number;
        };
        /**
         * @param key
         * @returns true if key is in down state
         */
        static getKeyDown(key: any): any;
        /**
         * @param key
         * @returns true if key is in up state
         */
        static getKeyUp(key: any): boolean;
        /**
         * @param mouseButton reserved for future use
         * @returns true if the mouse button is in the down state
         */
        static getMouseButtonUp(mouseButton: any): boolean;
        /**
         * @param mouseButton reserved for future use
         * @returns true if the mouse button is in the down state
         */
        static getMouseButton(mouseButton: any): boolean;
        /**
         * @param mouseButton reserved for future use
         * @returns true if the mouse button is in the down state
         */
        static getMouseButtonDown(mouseButton: any): boolean;
        /**
         * update should be called every game loop
         */
        static update(): void;
        states: {};
        mouseDown: boolean;
        mouseButtonDown: boolean;
        mousePosition: {
            x: number;
            y: number;
        };
        isFullScreen: boolean;
        isDown: (keyCode: any) => any;
        isUp: (keyCode: any) => boolean;
        /**
         * connect the event listeners
         */
        constructor();
        private onKeyUp;
        private onKeyDown;
        private onTouchStart;
        private onTouchMove;
        private onTouchEnd;
        private checkFullScreen();
    }
}
declare module bosco.utils {
    class Rnd {
        /**
         * @returns true/false random value
         */
        static nextBool(): boolean;
        static nextDouble(): number;
        static nextInt(max: any): number;
        /**
         * Generates a random number in a range
         *
         * @param start starting number of range
         * @param end optional ending number in range
         */
        static random(start: any, end?: any): any;
    }
}
declare module bosco.utils {
    /**
     * A Simple Timer
     * port of com.artemis.utils.Timer.java
     */
    class Timer {
        private delay;
        private repeat;
        private acc;
        private done;
        private stopped;
        /**
         * @param delay count of ms
         * @param repeat does the timer repeat?
         */
        constructor(delay: number, repeat?: boolean);
        /**
         * update is caller every game loop
         *
         * @param delta time passed since last update
         */
        update(delta: number): void;
        /**
         * reset the timer
         */
        reset(): void;
        /**
         * @returns true if timer is finished
         */
        isDone(): boolean;
        /**
         * @returns true if timer is not finished
         */
        isRunning(): boolean;
        /**
         * stop the timer
         */
        stop(): void;
        /**
         * set a new delay value
         * @param delay count
         */
        setDelay(delay: number): void;
        /**
         * abstract execute method
         * override to provide timed functionality
         */
        execute: () => void;
        /**
         * @returns the remaining timer as a percentage
         */
        getPercentageRemaining(): number;
        /**
         * @returns ths current delay
         */
        getDelay(): number;
    }
}
declare module bosco.utils {
    /**
     * Trig lookup tables
     * A replacement for performance impacting trig calcs
     *
     * Thanks to Riven
     * From: http://riven8192.blogspot.com/2009/08/fastmath-sincos-lookup-tables.html
     */
    class TrigLUT {
        /**
         * @param rad radians
         * @returns the sine of the radians
         */
        static sin(rad: number): number;
        /**
         * @param rad radians
         * @returns the cosine of the radians
         */
        static cos(rad: number): number;
        /**
         * @param deg degrees
         * @returns the sine of the degrees
         */
        static sinDeg(deg: number): number;
        /**
         * @param deg degrees
         * @returns the cosine of the degrees
         */
        static cosDeg(deg: number): number;
        private static RAD;
        private static DEG;
        private static SIN_BITS;
        private static SIN_MASK;
        private static SIN_COUNT;
        private static radFull;
        private static radToIndex;
        private static degFull;
        private static degToIndex;
        private static sin_;
        private static cos_;
        /**
         * @param update override Math object?
         */
        static init(update: boolean): void;
    }
}
/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
declare module bosco {
    /**
     * @returns true if browser running on a mobile platform
     */
    function isMobile(): boolean;
}
/**
 * Bosco.ts
 *
 * Game Shell
 *
 *     __  __         ___                            ___  ___
 *    / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
 *   / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
 *   \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/
 *
 */
declare module bosco {
    import Sprite = PIXI.Sprite;
    import Container = PIXI.Container;
    import SystemRenderer = PIXI.SystemRenderer;
    /** @type PIXI.Container game screen */
    var viewContainer: Container;
    /** @type PIXI.Container anything that <b>must</b> be in foreground */
    var foreContainer: Container;
    /** @type Object PIXI loader return values */
    var resources: any;
    /** @type Object raw configuration hash */
    var config: any;
    /** @type number time change in ms for current frame */
    var delta: number;
    /** @type number frames per second */
    var fps: number;
    var world: any;
    /**
     * Set the current controller group
     *
     * @param name
     */
    function controller(name: any, ...args: any[]): void;
    /**
     * Load assets and start
     *
     * @param config  Configuration object
     */
    function start(config: any): void;
    /**
     * Prefab -
     *
     * Composite an image
     * @param name
     * @param parent
     * @returns PIXI.Sprite
     */
    function prefab(name: string, parent?: Container): Sprite;
    /**
     * Game
     *
     * Top level game object
     * Runs the main controller
     */
    class Game {
        stage: Container;
        sprites: Container;
        foreground: Container;
        renderer: SystemRenderer;
        stats: any;
        config: any;
        resources: any;
        controllers: any;
        previousTime: number;
        private totalFrames;
        private elapsedTime;
        tween: boolean;
        input: boolean;
        /**
         * Create the game instance
         * @param config
         * @param resources
         */
        constructor(config: any, resources: any);
        /**
         * Game Loop
         * @param time
         */
        update: (time: number) => void;
        /**
         * Resize the main window
         */
        resize: () => void;
    }
}
