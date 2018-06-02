import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './layout.html';

Template.user_widget.helpers({
    userPrimaryEmail() {
        return Meteor.user().emails[0].address;
    },
    
    themeIs(theme) {
        return Meteor.user().theme == theme;
    }
});

Template.user_widget.events({
    'click #logout-user'(event, template) {
        Meteor.logout();
    },
    
    'click #switch-theme'(event, template) {
        let user = Meteor.user();
        let theme = 'dark';
        if (user.theme == 'dark') theme = 'light';
        
        Meteor.call('user.theme', user._id, theme);
        window.location.reload();
    }
});
