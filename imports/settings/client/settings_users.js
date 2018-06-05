import { Trivial } from '/imports/lib/connection';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Roles } from 'meteor/alanning:roles';

import './settings_users.html';

Template.settings_users.helpers({
    users() {
        return Trivial.users.find();
    },
    
    isActive(role) {
        let highest;
        
        if (Roles.userIsInRole(this._id, 'admin')) {
            highest = 'admin';
        } else if (Roles.userIsInRole(this._id, 'editor')) {
            highest = 'editor';
        } else if (Roles.userIsInRole(this._id, 'viewer')) {
            highest = 'viewer';
        } else {
            highest = '';
        }
        
        if (role == highest) return 'active';
    },
    
    isDisabled() {
        if (this._id == Trivial.user()._id) return 'disabled';
    },
        
    getPrimaryEmail() {
        return this.emails[0].address;
    },
    
    deleteTargetEmail() {
        let target = Session.get('delete-user-target');
        if (target) return target.emails[0].address;
    }
});

Template.settings_users.events({
    'click .set-role'(event, template) {
        let role = event.currentTarget.dataset.role;
        Trivial.call('user.set_role', this._id, role);
    },
    
    'click .delete-user'(event, template) {
        Session.set('delete-user-target', this);
        template.$('#del-user-modal').modal('show');
    },
    
    'click #confirm-delete-user'(event, template) {
        Meteor.call('user.delete', Session.get('delete-user-target')._id);
    }
});
