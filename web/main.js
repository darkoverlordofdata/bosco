bosco.start({
    namespace: "example",
    controllers: {
        main: "MenuController",
        game: ["GameController", "InputController", "ScoreLabelController"]
    },
    width: window.innerWidth,
    height: window.innerHeight,
    fullScreen: false,
    theme: "kenney",
    scale: false,
    stats: true,
    storage: false,
    options: {
        antialiasing: false,
        transparent: false,
        resolution: window.devicePixelRatio,
        autoResize: true,
        backgroundColor: 0x3c3c3c
    },
    properties: {
        skip: "false",
        leaderboard: "off",
        player: "",
        userId: "",
        playMusic: "true",
        playSfx: "true"
    },
    assets: {
        finish_png    : "res/Finish Line.png",
        opponent_png  : "res/Opponent.png",
        player_png    : "res/Player.png",
        square_png    : "res/Square.png",
        panel_png     : "assets/img/panel-650x400.png"

    },
    resources: {

        Opponent: {
            path: "res/Opponent.png",
            scale: {x: 0.5, y: 0.5},
            rotation: Math.PI/2 //90*Math.PI/180

        },
        Player: {
            path: "res/Player.png",
            scale: {x: 0.5, y: 0.5},
            rotation: Math.PI/2

        },
        "Finish Line": [
            {
                path: "res/Square.png",
                scale: {x: 5, y: 0.33},
                tint: 0xc0c0c0
            }, {
                path: "res/Finish Line.png",
                scale: {x: 0.132, y: 0.198},
                position: {x: 500, y: 0}
            }
        ]
    },

    ezgui: {
        menu: {

            id: "mainScreen",
            component: "MainScreen",

            width: window.innerWidth,
            height: window.innerHeight,
            image: "assets/img/panel-650x400.png",
            logo: { height: 100, transparent: true, text: "Bosco's Speedway",
                font: { size: "75px", family: "Skranji", color: "red"} },

            buttons: [
                { event: "play", text: "Play", width: 300, height: 80 },
                { event: "options", text: "Options", width: 300, height: 80 }
            ]

        }

    }
});