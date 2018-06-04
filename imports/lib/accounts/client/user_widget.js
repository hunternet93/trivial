import { Trivial } from '/imports/lib/connection';
import { Accounts } from '/imports/lib/accounts';
import { Template } from 'meteor/templating';

import './user_widget.html';

Template.user_widget.helpers({
    userPrimaryEmail() {
        return Accounts.user().emails[0].address;
    },
    
    themeIs(theme) {
        return Accounts.user().theme == theme;
    }
});

Template.user_widget.events({
    'click #logout-user'(event, template) {
        Accounts.logout();
    },
    
    'click #switch-theme'(event, template) {
        let user = Accounts.user();
        let theme = 'dark';
        if (user.theme == 'dark') theme = 'light';
        
        Trivial.call('user.theme', user._id, theme);
        window.location.reload();
    }
});
