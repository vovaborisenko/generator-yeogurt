/**
*   Forgot View
*/

'use strict';

<%= _.camelize(projectName) %> = <%= _.camelize(projectName) %> || {};

<%= _.camelize(projectName) %>.ForgotView = Backbone.View.extend({

    el: '.content',

    // Compiled template
    template: JST['client/templates/account/forgot.hbs'],

    // Delegated events
    events: {
        'submit form': 'formSubmit'
    },

    // Code that runs when View is initialized
    initialize: function () {
        this.render();
    },

    formSubmit: function(e) {
        e.preventDefault();
        var $form = $(e.currentTarget);
        app.account.forgot($form, {
            success: function(res) {
                Backbone.history.navigate('/', true);
            },
            error: function(err) {
                Backbone.history.navigate('/reset', true);
            },
        });
    },

    render: function() {
        this.$el.html(this.template);
        return this;
    }

});
