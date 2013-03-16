(function (angular) {
    'use strict';
    
    var controllers = angular.module('qna.controllers', ['qna.backend']);
    
    controllers.controller(
        'NewQuestionController',
        ['$scope', '$location', 'Question', function ($scope, $location, Question) {
            $scope.ask_question = function () {
                var timestamp = new Date()
                $scope.question.timestamp = timestamp;
                $scope.question.update_timestamp = timestamp.getTime();
                Question.save($scope.question, function (question) {
                    $location.path('/' + question._id.$oid);
                });
            };
            $scope.question = {};
        }
    ]);
    
    controllers.controller(
        'QuestionController',
        ['$scope', '$routeParams', '$timeout', 'Question', function ($scope, $routeParams, $timeout, Question) {
            var question_refresh_timer;
            var refresh_question = function () {
                Question.get({id: $routeParams.question_id}, function (question) {
                    $scope.question = new Question(question);
                    question_refresh_timer = $timeout(refresh_question, 7000);
                });
                
            };
            refresh_question();
            $scope.$on('$destroy', function () {
                $timeout.cancel(question_refresh_timer);
            });
            
            $scope.answer_question = function () {
                var question = $scope.question;
                var timestamp = new Date();
                question.update_timestamp = timestamp.getTime();
                question.answers = question.answers || [];
                question.answers.push(
                    angular.extend({timestamp: timestamp}, $scope.answer)
                );
                question.update(function () {
                    $scope.answer.answer = '';
                    $scope.question = question;
                });
            };
        }
    ]);
    
    controllers.controller(
        'AllQuestionsController',
        ['$scope', '$timeout', 'Question', function ($scope, $timeout, Question) {
            var fetch_questions = function () {
                Question.query(function (questions) {
                    $scope.questions = questions;
                    $timeout(fetch_questions, 13000);
                });
            };
            fetch_questions();
        }
    ]);
    
    controllers.controller(
        'UpdatesController',
        ['$scope', '$timeout', 'Question', function ($scope, $timeout, Question) {
            var last_update = new Date().getTime();
            
            var fetch_updates = function () {
                var timestamp_query = JSON.stringify({update_timestamp: {$gte: last_update}});
                Question.query({q: timestamp_query}, function (questions) {
                    $scope.questions = questions;
                    $timeout(fetch_updates, 9000);
                    last_update = new Date().getTime();
                });
            };
            fetch_updates();
        }
    ]);
    
})(window.angular);

