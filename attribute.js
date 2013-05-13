/**
 * Allows you to dynamically add/remove attributes
 */
angular.module('nag.attribute', [])
.directive('nagAttribute', [function() {
    return function(scope, element, attributes) {
      scope.$watch(attributes['nagAttribute'], function(newValue, oldValue) {
        if (angular.isObject(newValue)) {
          angular.forEach(newValue, function(check, attribute) {
            if(angular.isObject(check)) {
              var attributeValue = null;

              angular.forEach(check, function(innerCheck, value) {
                if(innerCheck === true) {
                  attributeValue = value;
                }
              });

              $(element).attr(attribute, attributeValue);
            } else {
              var attributeParts = attribute.split('::');

              if(check === true)  {
                $(element).attr(attributeParts[0], attributeParts[1]);
              } else {
                $(element).attr(attributeParts[0], null);
              }
            }
          });
        }
      }, true);
    };
  }
]);
