/**
 * Created by Adam on 4/21/2015.
 */

'use strict';

angular.module('projectTracker')
    .filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            if (items){
                angular.forEach(items, function(item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    var thisField = field;
                    while (thisField.indexOf('.') != -1){
                        var firstField = thisField.split('.')[0];
                        a = a[firstField];
                        b = b[firstField];
                        thisField = thisField.replace(firstField + '.', '');
                    }
                    return (a[thisField] > b[thisField] ? 1 : -1);
                });
                if(reverse) filtered.reverse();
            }
            return filtered;
        };
    });
