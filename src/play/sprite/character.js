/**
 * Created by Fan on 2015/2/17.
 */

var CharacterSprite = cc.Sprite.extend({
    ctor: function (arg) {

        this._super(arg.res || "#male_walkcycle_south_000.png");
        this.id = arg.id;

        this.updateAttribute(arg);
        this.state = g_ObjState.IDLE;

        this.walkcycleAnim = {
            'south': cc.animationCache.getAnimation('male_walkcycle_south'),
            'west': cc.animationCache.getAnimation('male_walkcycle_west'),
            'north': cc.animationCache.getAnimation('male_walkcycle_north'),
            'east': cc.animationCache.getAnimation('male_walkcycle_east')
        };

        this.scheduleUpdate();
    },
    update: function () {
        var _this = this;

        if (this.state == g_ObjState.IDLE) {
            if (this.action) {
                switch (this.action.type) {
                    case 'moveto':

                        // moving animation
                        var moveSpeed = g_Config.obj.moveSpeed;
                        var movingActions = [],
                            walkingActions = [];
                        var time = 0;
                        var lastRoute = null;
                        this.action.routes.forEach(function (route) {
                            var pos = g_PlayBackgroundLayer.getPositionAt(route.x, route.y);
                            var t = route.cost / moveSpeed;
                            movingActions.push(cc.moveTo(t, pos));

                            if (null != lastRoute) {
                                if (lastRoute.x < route.x) {
                                    walkingActions.push(cc.repeat(cc.animate(_this.walkcycleAnim.east), t));
                                } else if (lastRoute.x > route.x) {
                                    walkingActions.push(cc.repeat(cc.animate(_this.walkcycleAnim.west), t));
                                } else if (lastRoute.y < route.y) {
                                    walkingActions.push(cc.repeat(cc.animate(_this.walkcycleAnim.south), t));
                                } else {
                                    walkingActions.push(cc.repeat(cc.animate(_this.walkcycleAnim.north), t));
                                }
                            }

                            time += t;
                            lastRoute = route;
                        });
                        this.runAction(cc.sequence(movingActions));
                        this.runAction(cc.sequence(walkingActions));
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