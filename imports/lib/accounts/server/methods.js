import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { is_admin } from '/imports/lib/accounts/role_helpers.js';

Meteor.methods({
    'user.theme'(user_id, theme) {
        if (user_id != this.userId) is_admin(this);
        
        Meteor.users.update(user_id, {$set: {theme: theme}});
    },
    
    'user.reset_password'(user_id) {
        if (user_id != this.userId) is_admin(this);
        
        Accounts.sendResetPasswordEmail(user_id);
    },
    
    'user.delete'(user_id) {
        is_admin(this);
        if (user_id == this.userId)
            throw new Meteor.Error('cannot-delete-self', 'Users cannot delete themselves');
        
        Meteor.users.remove({_id: user_id});
    },
    
    'user.set_role'(user_id, role) {
        is_admin(this);
        
        Roles.removeUsersFromRoles(user_id, ['viewer', 'editor', 'admin']);
        
        let roles = [role];

        if (role == 'editor')
            roles = ['viewer', role];
        else if (role == 'admin')
            roles = ['viewer', 'editor', role];
        
        Roles.addUsersToRoles(user_id, roles);
    }       
});
