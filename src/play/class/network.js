/**
 * Created by Fan on 2015/2/14.
 */
var NetwrokHandler = function () {
    var socket = new WebSocket("ws://127.0.0.1:8080", "mg-protocol");
    socket.onopen = function (event) {
        socket.send(JSON.stringify({
            t: 'reg',
            r: {x: 0, y: 0}
        }));
        socket.send(JSON.stringify({
            t: 'map',
            r: {x: 0, y: 0}
        }));
    };
    socket.onmessage = function (event) {
        cc.log("receive message: " + event.data);

        var data = event.data;
        if (data.match('^\{(.+:.+,*){1,}\}$')) {
            data = JSON.parse(data);
        }

        switch (data.t) {
            case 'mapData':
                g_PlayBackgroundLayer.addMap(data);
                break;
            case 'regionData':
                data.data.forEach(function (obj) {
                    if ('1' == obj.m) {
                        g_PlayObjectLayer.addOrUpdateObj(obj);
                    } else {
                        g_PlayStaticLayer.addOrUpdateObj(obj);
                    }
                });
                break;
        }
    };
};