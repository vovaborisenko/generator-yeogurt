/**
*   Settings View
*/

'use strict';

<%= _.camelize(projectName) %> = <%= _.camelize(projectName) %> || {};

<%= _.camelize(projectName) %>.SettingsView = Backbone.View.extend({

    el: '.content',

    // Compiled template
    template: JST['client/templates/account/settings.hbs'],

    // Delegated events
    events: {
        'submit #profile-form, #password-form': 'formInfo',
        'submit #password-form': 'formPassword',
        'submit #delete-form': 'formDelete',
    },

    // Code that runs when View is initialized
    initialize: function () {
        this.render();
    },

    formInfo: function(e) {
        e.preventDefault();
        var $form = $(e.currentTarget);
        app.account.updateInfo($form, {
            success: function(res) {
                app.account.set({
                    email: res.user.email,
                    firstName: res.user.firstName,
                    lastName: res.user.lastName
                });
                Backbone.history.navigate('/settings', true);
            }
        });
    },

    formPassword: function(e) {
        e.preventDefault();
        var $form = $(e.currentTarget);
        app.account.updatePassword($form, {
            success: function(res) {
                Backbone.history.navigate('/settings', true);
            }
        });
    },

    formDelete: function(e) {
        e.preventDefault();
        app.account.destroy({
            success: function(res) {
                app.account.logout();
                Backbone.history.navigate('/', true);
            },
            complete: function(res) {
                app.messages.showMessages(res.responseJSON);
            }
        });
    },

    render: function () {
        this.$el.html(this.template({
            user: app.account.toJSON()
        }));
        return this;
    }

});
