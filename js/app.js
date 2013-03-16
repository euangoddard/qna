(function (angular) {
    'use strict';
    
    angular.module('qna', ['qna.controllers', 'qna.backend', 'qna.directives']).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when(
                '/',
                {templateUrl: 'partials/new.html', controller: 'NewQuestionController'}
            );
            $routeProvider.when(
                '/:question_id/',
                {templateUrl: 'partials/question.html', controller: 'QuestionController'}
            );
            $routeProvider.otherwise({redirectTo: '/'});
            
        }
    ]);
})(window.angular);
