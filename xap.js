/**
 * Copyright 2016 Aivo Antsman
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var xap = require('xap');

    // The Output Node
    function xAPout(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        var node = this;
        if (n.showcount) {
            var count = 0;
        } else {
            node.status({});
        }

        node.on("input", function(msg) {
            var cls = n.class || msg.options.class;
            var src = n.source || msg.options.source;
            var tgt = n.target || msg.options.target;
            var uid = n.uid || msg.options.uid;
            var mgt = n.messagetype || msg.options.messagetype;
            var brc = n.broadcast || msg.options.broadcast;
            var prt = n.port || msg.options.port;
/*
            node.log(RED._("cls " + cls));
            node.log(RED._("src " + src));
            node.log(RED._("tgt " + tgt));
            node.log(RED._("uid " + uid));
*/
            var message = {};
            if (n.message != "") {
                message = JSON.parse(n.message);
            } else if (msg.hasOwnProperty("payload")) {
                message = msg.payload;
            }
            var options = {'class': cls, 'source': src, 'target': tgt, 'uid': uid, 'broadcast': brc, 'port': prt};
            var xAPBroadcaster = new xap.XAPBroadcaster(options);
            xAPBroadcaster.send(mgt, message);
/*
            node.log(RED._("xap.opt " + JSON.stringify(options)));
            node.log(RED._("xap.msg " + JSON.stringify(message)));
*/
            if (n.showcount) {
                node.status({ fill: "grey", shape: "ring", text: "count: " + ++count });
            }
        });
    }
    RED.nodes.registerType("xap out", xAPout);
}
