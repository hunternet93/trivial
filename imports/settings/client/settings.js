import { Trivial } from '/imports/lib/connection';
import { Template } from 'meteor/templating';

import './settings_users.js';
import './settings.html';

Router.route('/settings', function () {
    this.wait(Trivial.subscribe('settings.all'));
    this.wait(Trivial.subscribe('users.all'));
    
    if (this.ready()) {
        this.render('settings');
    } else {
        this.render('loading');
    }
}, {
    name: 'settings'
});
