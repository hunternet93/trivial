import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

let Trivial = null;
let MongoConn = {};

if (Meteor.isCordova) {
    // App client, connect to user-specified server.
    // TODO code up server connection UI, then actually test
    Tracker.autorun(() => {
        Meteor.disconnect(); // Don't use default connection.

        let url = Session.get('server-url');
        if (url) {
            Trivial = DDP.connect(url);
            MongoConn = {connection: Trivial};
        }
    });
} else {
    // Server or in-browser client, use normal Meteor server connection.
    Trivial = Meteor;
}

export { Trivial, MongoConn };
