import { Meteor } from 'meteor/meteor';
import { Settings } from '../collections.js';

Meteor.publish('settings.all', function () {    
    return Settings.find();
});

Meteor.publish('settings.some', function (settings) {
    return Settings.find({_id: {$in: settings}});
});
