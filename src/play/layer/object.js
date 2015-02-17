/**
 * Created by Fan on 2015/2/14.
 */

var g_PlayObjectLayer;
var PlayObjectLayer = cc.Layer.extend({
    objs: {},
    ctor: function () {

        this._super();

        this.anchorX = 0;
        this.anchorY = 0;

        g_PlayObjectLayer = this;

        this.initSpriteFrames();
        this.scheduleUpdate();
    },
    initSpriteFrames: function () {
        cc.spriteFrameCache.addSpriteFrames(res.sprites_characters_male_walkcycle_plist);

        cc.animationCache.addAnimations(res.sprites_characters_male_walkcycle_animation_plist);

        var anim = cc.animationCache.getAnimation('male_walkcycle_south');
    },
    update: function () {
        this.setPosition(g_PlayTouchLayer.position);
        this.setScale(g_PlayTouchLayer.zoom);
    },
    addOrUpdateObj: function (obj) {

        var sprite = this.objs[obj.id];
        if (!sprite) {
            sprite = new CharacterSprite({
                'res': '',
                'x': obj.x,
                'y': obj.y
            });
            this.addChild(sprite);
            this.objs[obj.id] = sprite;
        }

        // 更新位置
        sprite.updateAttribute(obj);
    }
});