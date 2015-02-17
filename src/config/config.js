/**
 * Created by Fan on 2015/2/14.
 */

var g_Config = {
    freq: {
        draw: 1 / 30
    },
    winSize: cc.size(960, 640),
    obj: {
        moveSpeed: 5
    }
};

g_Config.w = g_Config.winSize.width;
g_Config.h = g_Config.winSize.height;
g_Config.w_2 = g_Config.winSize.width / 2;
g_Config.h_2 = g_Config.winSize.height / 2;

g_Config.tw = 32; // tile width
g_Config.tw_2 = g_Config.tw / 2;
g_Config.ww = 100; // world width

var g_ObjState = {
    IDLE: 0,
    MOVING: 10
};