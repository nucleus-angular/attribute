/**
 * Allows you to dynamically add/remove attributes
 *
 * @module nag.attribute
 * @ngdirective nagAttribute
 *
 * @example
 <div style="cursor: pointer" nag-attribute="{'data-test::on': customAttribute}" ng-click="customAttribute = !customAttribute">
   Click on me to toggle my data-test attribute on/off
 </div>
 <div style="cursor: pointer" nag-attribute="{'data-test': {'value1': customAttribute2, 'value2': !customAttribute2}}" ng-click="customAttribute2 = !customAttribute2" data-test="value2">
   Click on me to toggle my data-test attribute value
 </div>
 <div style="cursor: pointer" nag-attribute="{'data-test::on': customAttribute3, 'data-test2': {'value1': customAttribute4, 'value2': !customAttribute4}}" ng-click="customFunction()" data-test2="value2">
   Click on me to toggle my data-test attribute on/off and data-test2 attribute value
 </div>

 <script>
   $scope.customAttribute = false;
   $scope.customAttribute2 = false;
   $scope.customAttribute3 = false;
   $scope.customAttribute4 = false;

   $scope.customFunction = function() {
     $scope.customAttribute3 = !$scope.customAttribute3;
     $scope.customAttribute4 = !$scope.customAttribute4;
   };
 </script>
 */
angular.module('nag.attribute', [])
.directive('nagAttribute', [function() {
    return function(scope, element, attributes) {
      var valueWatchApplied = false;

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

              //this will allow you to add attribute without any value (like disabled for input field)
              attributeParts[1] = attributeParts[1] || '';

              if(check === true)  {
                var re = /{.*}/g;
                var trueValue = attributeParts[1];

                //lets see if the value should be evaluated from the content of the scope
                if(trueValue.match(re)) {
                  var variableValue = trueValue.substr(1, trueValue.length - 2)
                  trueValue = scope.$eval(variableValue);

                  if(!valueWatchApplied) {
                    scope.$watch(variableValue, function(newValue, oldValue) {
                      $(element).attr(attributeParts[0], newValue);
                      valueWatchApplied = true;
                    }, true);
                  }
                }

                $(element).attr(attributeParts[0], trueValue);
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
