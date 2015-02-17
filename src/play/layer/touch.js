/**
 * Created by Fan on 2015/2/14.
 */

var g_PlayTouchLayer;

var PlayTouchLayer = cc.Layer.extend({

    position: null,
    zoom: 1,
    ctor: function () {

        this._super();
        g_PlayTouchLayer = this;

        this.position = {
            x: 0,
            y: 0
        };

        this.anchorX = 0;
        this.anchorY = 0;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchCancelled
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseScroll: this.onMouseScroll
        }, this);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        return true;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta();
        target.position.x += delta.x;
        target.position.y += delta.y;
        target.setPosition(target.position);
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
    },
    onTouchCancelled: function (touch, event) {
        var target = event.getCurrentTarget();
    },
    onMouseScroll: function (event) {
        var target = event.getCurrentTarget();

        var location = event.getLocation();
        var deltaX = (location.x - target.position.x) / target.zoom;
        var deltaY = (location.y - target.position.y) / target.zoom;

        var prevZoom = target.zoom;
        var scrollY = event.getScrollY();
        if (scrollY > 0) {
            target.zoom = Math.min(2, target.zoom + 0.25);
            target.position.x -= (target.zoom - prevZoom) * deltaX;
            target.position.y -= (target.zoom - prevZoom) * deltaY;
        } else if (scrollY < 0) {
            target.zoom = Math.max(0.25, target.zoom - 0.25);
            target.position.x -= (target.zoom - prevZoom) * deltaX;
            target.position.y -= (target.zoom - prevZoom) * deltaY;
        }
    }
});