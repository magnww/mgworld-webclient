/**
 * Created by Fan on 2015/2/17.
 */

var CharacterSprite = cc.Sprite.extend({
    ctor: function (arg) {

        this._super(arg.res || "#male_walkcycle_south_000.png");
        this.id = arg.id;
        //this.anchorX = 0.25;
        //this.anchorY = -0.25;

        this.updateAttribute(arg);
        this.state = g_ObjState.IDLE;

        var anim = cc.animationCache.getAnimation('male_walkcycle_south');
        this.runAction(cc.repeatForever(cc.animate(anim)));
        this.scheduleUpdate();
    },
    update: function () {
        if (this.state == g_ObjState.IDLE) {
            if (this.action) {
                switch (this.action.type) {
                    case 'moveto':
                        var moveSpeed = g_Config.obj.moveSpeed;
                        var actions = [];
                        var time = 0;
                        this.action.routes.forEach(function (route) {
                            var pos = g_PlayBackgroundLayer.getPositionAt(route.x, route.y);
                            var t = route.cost / moveSpeed;
                            actions.push(cc.moveTo(t, pos));
                            time += t;
                        });
                        this.runAction(cc.sequence(actions));
                        this.scheduleOnce(this.idle, time);
                        this.state = g_ObjState.MOVING;
                        delete this.action;
                        break;
                }
            }
        }
    },
    idle: function () {
        this.state = g_ObjState.IDLE;
    },
    updateAttribute: function (atts) {
        var pos = g_PlayBackgroundLayer.getPositionAt(atts.x, atts.y);
        this.x = pos.x;
        this.y = pos.y;

        if (atts.act) {
            this.action = atts.act;
        }
    }
});