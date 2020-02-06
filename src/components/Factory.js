import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    canvas: {
        overflow: 'hidden'
    }
})

export default () => {
    const [state, setState] = React.useState({
        screen: {
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.devicePixelRatio || 1,
        },
        context: null,
        keys: {
            left: 0,
            right: 0,
            up: 0,
            down: 0,
            space: 0,
        },
        asteroidCount: 3,
        currentScore: 0,
        topScore: localStorage['topscore'] || 0,
        inGame: false
    })

    const ship = [];
    const asteroids = [];
    const bullets = [];
    const particles = [];

    const handleResize = (value, e) => {
        setState(prevState => ({
            ...prevState,
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.devicePixelRatio || 1,
            }
        }));
    }

    const handleKeys = (value, e) => {
        let keys = this.state.keys;
        if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
        if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
        if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
        if (e.keyCode === KEY.SPACE) keys.space = value;
        setState(prevState => ({
            ...prevState,
            keys: keys
        }));
    }

    const checkCollision = (obj1, obj2) => {
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        if (length < obj1.radius + obj2.radius) {
            return true;
        }
        return false;
    }

    const checkCollisionsWith = (items1, items2) => {
        var a = items1.length - 1;
        var b;
        for (a; a > -1; --a) {
            b = items2.length - 1;
            for (b; b > -1; --b) {
                var item1 = items1[a];
                var item2 = items2[b];
                if (checkCollision(item1, item2)) {
                    item1.destroy();
                    item2.destroy();
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', this.handleKeys.bind(this, false));
        window.addEventListener('keydown', this.handleKeys.bind(this, true));
        window.addEventListener('resize', this.handleResize.bind(this, false));

        const context = canvas.current.getContext('2d');
        setState(prevState => ({
            ...prevState,
            context: context
        }));
        startGame();
        requestAnimationFrame(() => { this.update() });
        const onUnmount = () => {
            window.removeEventListener('keyup', this.handleKeys);
            window.removeEventListener('keydown', this.handleKeys);
            window.removeEventListener('resize', this.handleResize);
        }
    })

    const canvas = React.useRef();
    const classes = useStyles();
    return <div>
        <canvas ref={canvas}
            width={screen.width * screen.ratio}
            height={screen.height * screen.ratio}
        />
    </div>
}

