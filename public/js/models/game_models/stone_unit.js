define([
    'backbone',
    'models/game_models/game_model',
    'collections/stones'
], function(
    Backbone,
    GameModel,
    stones
){
    var StoneUnit = GameModel.extend({    
        y: -50,
        width: 48,
        height: 50,
        initialize: function(gamelogic) {     
            StoneUnit.__super__.initialize(gamelogic, this);
            this.image = StoneUnit.image;
        },
        move: function(playerX, playerY) {            
            this.y = this.y + 3;

            if (this.y > this.canvasHeight) {               
                stones.remove(this);
                this.gamelogic.scores = this.gamelogic.scores + 2;
            }
        },
        contains: function(canvas_x, canvas_y) {
            var x = canvas_x - this.x;
            var y = canvas_y - this.y;
            var r = this.width / 2;
            
            x -= this.width / 2;
            y -= this.height / 2;
            
            return y >= (-1) * Math.sqrt(r * r - x * x) && y <= Math.sqrt(r * r - x * x);
        }
    }, {
        image: new Image(),
        loadImage: function() {
            this.image.src = "/images/stone.gif";
        }
    });

    return StoneUnit;
});
