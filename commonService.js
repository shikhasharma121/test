(function () {
    'use strict';

    angular.module('attachmentApp').service('commonService', [
            '$q', '$http', '$location', 'SERVERCONFIG', 'localStorageService',
            commonService
    ]);

    function commonService($q, $http, $location, SERVERCONFIG, localStorageService) {
        
        return {
            getLocalStorage: function (name) {
                return localStorageService.get(name);
            },
            
            setLocalStorage: function (name, value) {
                localStorageService.set(name, value);
            },

            setFolderId: function (value) {
                localStorageService.set('FolderId', value);
            },

            getFolderId: function () {
                return localStorageService.get('FolderId');
            },
            
            setFolderName: function (value) {
                localStorageService.set('FolderName', value);
            },

            getFolderName: function () {
                return localStorageService.get('FolderName');
            },

            getSession: function () {
                    return localStorageService.get('SessionId');
            },

            commonDetails: function (methodType, urls, reqdata) {
                var deferred = $q.defer();
                var session = this.getSession();
                $http({
                    method: methodType,
                    url: urls,
                    data: reqdata,
                    headers: {
                        'Content-Type': 'application/json',
                        'AuthorizationKey': SERVERCONFIG.AUTHENTICATIONKEY,
                        'Token': session
                        
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data)

                    })
                    .error(function (error) {
                        deferred.reject('Remote server not reachable !');
                    });

                return deferred.promise;
            },

            gridDetails: function (methodType, url, reqdata, params, headers) {
                var deferred = $q.defer();
                var session = this.getSession();
                var header = headers != '' ? headers : {
                    'Content-Type': 'application/json',
                    'AuthorizationKey': SERVERCONFIG.AUTHENTICATIONKEY,
                    'Token': session
                }

                $http({
                    method: methodType,
                    url: url,
                    data: reqdata,
                    params: params,
                    headers: header
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (error) {
                        deferred.reject('grid data load failed for ');
                    });

                return deferred.promise;

            }
        }
    }

})();