import { Trivial } from '/imports/lib/connection';
import { Template } from 'meteor/templating';

import './user.html';

Router.route('/user/:_id', function () {
    this.wait(Trivial.subscribe('users.one', this.params._id));
    
    if (this.ready()) {
        this.render('user', {
            data: function () {
                return Meteor.users.findOne({_id: this.params._id});
            }
        });
    } else {
        this.render('loading');
    }
}, {
    name: 'user'
});


Template.user.helpers({
    getPrimaryEmail() {
        return this.emails[0].address;
    },
    
    permissionsDisabled() {
        // Admins can't remove their own admin rights
        if (Meteor.userId() == this._id) return true;
        else return !Roles.userIsInRole(Meteor.userId(), 'admin');
    },
    
    inRole(role) {
        return 'true' ? Roles.userIsInRole(this._id, role) : 'false';
    }
});

Template.user.events({
    'click #reset-password'(event, template) {
        Meteor.call('user.reset_password', template.data._id);
    },
    
    'click #del-user'(event, template) {
        template.$('#del-user-modal').modal('hide').on('hidden.bs.modal', () => {
            Meteor.call('user.delete', template.data._id);
            Router.go('settings');
        });
    },
    
    'input .user-role'(event, template) {
        let role = event.target.id;
        if (event.target.checked) {
            Meteor.call('user.add_role', template.data._id, role);
        } else {
            Meteor.call('user.remove_role', template.data._id, role);
        }
    }
});
