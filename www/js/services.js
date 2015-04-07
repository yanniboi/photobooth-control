angular.module('photobooth.services', [])
    .service('Utils', ['$rootScope', '$ionicLoading', '$window', function ($rootScope, $ionicLoading, $window) {
        $rootScope.show = function (text, duration) {
            $rootScope.loading = $ionicLoading.show({
                template: text ? text : 'Loading...',
                animation: 'fade-in',
                noBackdrop: false,
                duration: duration ? duration : 0
            });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.notify =function(text){
            $rootScope.show(text, 1000);
        };

        // Method to check for internet connection.
        $rootScope.checkNetwork = function () {
            if (typeof navigator.connection === 'undefined') {
                // If you can't check connection, assume it exists.
                return true;
            }
            else if (navigator.connection.type == 0) {
                console.log('Connection not accessible');
                return true;
            }
            else if (navigator.connection.type == Connection.NONE) {
                return false;
            }
            return true;
        };
    }]);