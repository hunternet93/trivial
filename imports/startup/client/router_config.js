import { Trivial } from '/imports/lib/connection';
import { Router } from 'meteor/iron:router';
import { AccountsTemplates } from 'meteor/useraccounts:core';

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function () {
        return Trivial.subscribe('playlists.list');
    }
});

AccountsTemplates.configure({
    defaultLayout: 'layout'
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('resendVerificationEmail');
