
    var pacWidth = 100;
    var mouth = 0;
    var posXMax = window.innerWidth - (pacWidth+10);
    var posYMax = window.innerHeight -(pacWidth+20);
    var game = document.getElementById('game');
    const pacArray = [
        ['PacMan1.png', 'PacMan2.png'],
        ['PacMan3.png', 'PacMan4.png']
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    var mouthClose = () => {
        mouth++;
        if (mouth >= 2){mouth = 0};
    };

    setInterval(mouthClose, 150);
    //function setPosToRandom(scale) {
    function setPosToRandom() {
        return {
            x: Math.random() * posXMax,
            y: Math.random() * posYMax
        }
    }
    function setVelToRandom(scale) {
        return {
            x: (Math.random() * scale)-(scale*0.5),
            y: (Math.random() * scale)-(scale*0.5)
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setVelToRandom(20); // {x:?, y:?}
        let position = setPosToRandom();
//        console.log('vel: ' + JSON.stringify(velocity));
//        console.log('pos: ' + JSON.stringify(position));
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = pacArray[Math.floor(Math.random() * 2)][Math.floor(Math.random() * 2)];
        newimg.width = pacWidth;
        // set position here 
        newimg.style.left = position.x + "px";
        newimg.style.top = position.y + "px";
        newimg.direction = 0;
        newimg.open = 0;
        console.log(newimg.open);
        console.log(newimg.direction);
        
        // add new Child image to game
        game.appendChild(newimg);
        //game.appendChild( ? ? ? ){};
        // return details in an object
        return {position, velocity, newimg};
        };

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        posXMax = window.innerWidth - (pacWidth+10);
        posYMax = window.innerHeight -(pacWidth+20);
        pacMen.forEach((item) => {
            checkCollisions(item);
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x + 'px';
            item.newimg.style.top = item.position.y + 'px';

            if (item.velocity.x > 0){item.newimg.direction = 0};
            if (item.velocity.x < 0){item.newimg.direction = 1};         
            item.newimg.src = pacArray[item.newimg.direction][mouth];
            console.log(item.src);
        })
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        // detect collision with all walls and make pacman bounce
        if (item.position.x >= (posXMax)) {
            item.velocity.x = -Math.abs(item.velocity.x);
        }
        if (item.position.x <= (0)) {
            item.velocity.x = Math.abs(item.velocity.x);
        }
        if (item.position.y >= (posYMax)) {
            item.velocity.y = -Math.abs(item.velocity.y);
        }
        if (item.position.y <= (0 + 30)) {
            item.velocity.y = Math.abs(item.velocity.y);
        }
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
        //console.log('pacMen: '+ JSON.stringify(pacMen));
    };
