(function (angular) {
    
    var directives = angular.module('qna.directives', []);
    
    directives.directive('avatar', function () {
        var avatar_directive = {
            template: '<img src="http://www.gravatar.com/avatar/{{ hash }}?s=64&d=identicon" alt="Image of {{ email }}" class="media-object">',
            replace: true,
            restrict: 'E',
            scope: true,
            link: {
                post: function (scope, element, attrs) {
                    attrs.$observe('email', function (email) {
                        scope.email = email;
                        var hash = CryptoJS.MD5(email.toLowerCase());
                        scope.hash = hash.toString();
                    });
                }
            }
        };
        return avatar_directive;
        
    });
    
})(window.angular);