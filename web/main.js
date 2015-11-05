bosco.start({
    "namespace": "example",
    "controllers": [
        "GameController"
    ],
    "width": window.innerWidth,
    "height": window.innerHeight,
    "fullScreen": false,
    "scale": false,
    "scaleType": "FILL",
    "stats": true,
    "storage": false,
    "options": {
        "antialiasing": false,
        "transparent": false,
        "resolution": window.devicePixelRatio,
        "autoResize": true,
        "backgroundColor": "0x3c3c3c"
    },
    "properties": {
        "skip": "false",
        "leaderboard": "off",
        "player": "",
        "userId": "",
        "playMusic": "true",
        "playSfx": "true"
    },
    "assets": {
        finish_png    : 'res/Finish Line.png',
        opponent_png  : 'res/Opponent.png',
        player_png    : 'res/Player.png',
        square_png    : 'res/Square.png'
    },
    "resources": {

        'Finish Line': [
            {
                path: 'res/Square.png',
                scale: {
                    x: 5,
                    y: .33,
                    z: 1
                },
                tint: 0xc0c0c0
            }
            ,
            {
                path: 'res/Finish Line.png',
                scale: {
                    x: .4*.33,
                    y: .6*.33,
                    z: 1
                },
                position: {
                    x: 500,
                    y: 0
                }
            }
        ],
        'Opponent': {
            path: 'res/Opponent.png',
            scale: {
                x:.5,
                y:.5,
                z:.5
            },
            rotation: {
                x: 0,
                y: 0,
                z: 90*Math.PI/180
            }

        },
        'Player': {
            path: 'res/Player.png',
            scale: {
                x:.5,
                y:.5,
                z:.5
            },
            rotation: {
                x: 0,
                y: 0,
                z: 90*Math.PI/180
            }

        }
    }
});