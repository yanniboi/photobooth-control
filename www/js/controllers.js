angular.module('photobooth.controllers', [])

    .controller('DashCtrl', function($scope, $rootScope, $http, Utils) {
        $rootScope.$watch('settings', function () {
            $scope.settings = $rootScope.settings;
        });

        if (!$rootScope.hasOwnProperty('settings')) {
            $rootScope.settings = {
                ip: window.localStorage.getItem('ip')
            };
        }

        $scope.send = function(endpoint) {
            if ($rootScope.checkNetwork()) {
                var url = 'http://' + $rootScope.settings.ip + '/photobooth/' + endpoint;
                $http.get(url).then(function(resp) {
                    console.log('Success', resp);
                    // For JSON responses, resp.data contains the result
                }, function(err) {
                    console.error('ERR', err);
                    // err.status will contain the status code
                })
            }
            else {
                $rootScope.notify("You are not connected to the internet...");
            }


        }


    })

    .controller('AccountCtrl', function($scope, $rootScope, $state, Utils) {
        if (!$rootScope.hasOwnProperty('settings')) {
            $rootScope.settings = {};
        }

        $scope.settings = {
            ipPlaceholder: $rootScope.settings.hasOwnProperty('ip') ? $rootScope.settings.ip : '192.168.1.100'
        };

        // Save action for save button.
        $scope.submit = function() {
            window.localStorage.setItem('ip', $scope.settings.ip);
            $rootScope.settings.ip = $scope.settings.ip;
            $rootScope.notify('Settings saved...');
            $state.go('tab.dash');
        }
    });
