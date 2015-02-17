/**
 * Created by Fan on 2015/2/14.
 */

var g_PlayBackgroundLayer;
var PlayBackgroundLayer = cc.Layer.extend({

    _maps: {},
    _worldSize: g_Config.ww,

    ctor: function () {

        this._super();

        this.anchorX = 0;
        this.anchorY = 0;

        g_PlayBackgroundLayer = this;

        this.initSpriteFrames();
        this.scheduleUpdate();
    },
    initSpriteFrames: function () {

    },
    update: function (layer) {
        this.setPosition(g_PlayTouchLayer.position);
        this.setScale(g_PlayTouchLayer.zoom);
    },
    addMap: function (args) {
        var map;
        if (args.data instanceof cc.TMXTiledMap) {
            map = args.data;
        } else {
            map = new cc.TMXTiledMap(args.data, 'res');
        }

        var oldMap = this._maps[this._indexToKey(args.r.x, args.r.y)];
        if (oldMap) {
            this.removeChild(oldMap);
        }

        this._maps[this._indexToKey(args.r.x, args.r.y)] = map;
        this.addChild(map);
    },
    getPositionAt: function (x, y) {
        var map = this._maps[this._xyToKey(x, y)];
        // TODO 应处理图块坐标转换，目前只支持一张图
        return map.getLayer('layer1').getPositionAt(x, y);
    },
    _xyToIndex: function (x, y) {
        return {
            'xIndex': Math.floor(x >= 0 ? x / this._worldSize : (x - this._worldSize) / this._worldSize),
            'yIndex': Math.floor(y >= 0 ? y / this._worldSize : (y - this._worldSize) / this._worldSize)
        };
    },
    _xyToKey: function (x, y) {
        var index = this._xyToIndex(x, y);
        return this._indexToKey(index.xIndex, index.yIndex);
    },
    _indexToKey: function (xIndex, yIndex) {
        return 'i' + xIndex + '_' + yIndex;
    }
});