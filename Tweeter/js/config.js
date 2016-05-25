(function() {
    'use strict';
    angular
        .module('myApp')
        .constant('URL', 'https://api.contentstack.io/v2/content_types/tweets/entries')
        .config(config);
    config.$inject = ['authenticationProvider', 'URL']; //this is optinal here

    function config(authenticationProvider, URL) {
        authenticationProvider
            .setKeys('blt0624b335c13a74e8', 'blta265c80c31bcc8e98d577c66', URL);
    }
})();
