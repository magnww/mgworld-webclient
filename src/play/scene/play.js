/**
 * Created by Fan on 2015/2/14.
 */

var GamePlayLayer = cc.Layer.extend({

    _backgroundLayer: null,
    _staticLayer: null,
    _objectLayer: null,
    _uiLayer: null,
    _touchLayer: null,

    ctor: function () {
        this._super();

        this.initSpriteFrames();

        this.initLayers();
    },
    initSpriteFrames: function () {

    },
    initLayers: function () {
        this._backgroundLayer = new PlayBackgroundLayer();
        this.addChild(this._backgroundLayer, 10);
        this._staticLayer = new PlayStaticLayer();
        this.addChild(this._staticLayer, 20);
        this._objectLayer = new PlayObjectLayer();
        this.addChild(this._objectLayer, 30);
        this._uiLayer = new PlayUILayer();
        this.addChild(this._uiLayer, 40);
        this._touchLayer = new PlayTouchLayer();
        this.addChild(this._touchLayer, 100);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new GamePlayLayer();
        this.addChild(layer);

        this.networkHandler = new NetwrokHandler();
    }
});