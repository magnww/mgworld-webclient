/**
 * Created by Fan on 2015/2/14.
 */

var g_PlayStaticLayer;
var PlayStaticLayer = cc.Layer.extend({
    objs: {},
    ctor: function () {

        this._super();

        this.anchorX = 0;
        this.anchorY = 0;

        g_PlayStaticLayer = this;

        this.initSpriteFrames();
        this.scheduleUpdate();
    },
    initSpriteFrames: function () {
        cc.spriteFrameCache.addSpriteFrames(res.objs_plist);
    },
    update: function () {
        this.setPosition(g_PlayTouchLayer.position);
        this.setScale(g_PlayTouchLayer.zoom);
    },
    addOrUpdateObj: function (obj) {
        var pos = g_PlayBackgroundLayer.getPositionAt(obj.x, obj.y);

        var sprite = this.objs[obj.id];
        if (!sprite) {
            sprite = new BuildingSprite({
                'res': '#tent.png',
                'x': pos.x,
                'y': pos.y
            });
            this.addChild(sprite);
            this.objs[obj.id] = sprite;
        }

        // 更新位置
        sprite.setPosition(pos.x, pos.y);
    }
});