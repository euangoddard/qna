(function (angular) {
    'use strict';
    
    var MONGOLAB_API_URL = 'https://api.mongolab.com/api/1/databases/qna/';
    
    var MONGOLAB_API_KEY = '50c48d11e4b012b961327393';
    
    angular.module('qna.backend', ['ngResource'])
        .factory('Question', function ($resource) {
            var Question = $resource(
                MONGOLAB_API_URL + 'collections/questions/:id',
                {apiKey: MONGOLAB_API_KEY},
                {update: { method: 'PUT'}}
            );
            
            Question.prototype.update = function (callback) {
                return Question.update(
                    {id: this._id.$oid},
                    angular.extend({}, this, {_id: undefined}),
                    callback
                );
            };
            
            Question.prototype.destroy = function (callback) {
                return Question.remove({id: this._id.$oid}, callback);
            };
            return Question;
        });
    
})(window.angular);
