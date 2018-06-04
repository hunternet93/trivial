import { Trivial } from '/imports/lib/connection';
import { Accounts } from 'meteor/accounts-base';

// TODO the docs say AccountsClient can be used to connect to other servers to authenticate, but AccountsClient never imports.
// this is needed to support connecting user-hosted servers from mobile apps
//import { AccountsClient } from 'meteor/accounts-base';
//console.log(AccountsClient);
//const Accounts = new AccountsClient({connection: Trivial});

// Temporary workaround, just return the normal Accounts object

export { Accounts };
