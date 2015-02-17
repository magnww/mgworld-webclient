/**
 * Created by Fan on 2015/2/14.
 */

var BuildingSprite = cc.Sprite.extend({
    ctor: function (arg) {

        this._super(arg.res || "#tent.png");
        this.x = arg.x;
        this.y = arg.y;
        //this.anchorX = 0;
        //this.anchorY = 0;
    }
});