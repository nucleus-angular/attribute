/**
 * # Attribute
 *
 * This allows you to dynamically be able to add or change attribute values for an element. There are a few different formats the this object can be formatted in.
 *
 * The first format is where the key has both the attribute name and value separated by a double colon (::) and the value is the conditional that determines whether or not this attribute/value value should be on the element. This format is good for an attribute that will allows have one value and eiher should or should not be there.
 *
 * ```html
 * <div nag-attribute="{'data-test::on': customAttribute}"
 *      ng-click="customAttribute = !customAttribute">
 *   Click on me to toggle my data-test attribute on/off
 * </div>
 *
 * <script>
 *   //code inside the controller
 *   $scope.customAttribute = false;
 * </script>
 * ```
 *
 * The second format is good for attribute that should always be on the element but you want to be able to toggle the value of the attribute. In the second format, the key of the object is the name of the attribute and the value is another object. That object value with have multiple properties with the name if the value for the attribute and the value is the consitional to check to see if that should be the value of the attribute.
 *
 * ```html
 * <div nag-attribute="{'data-test': {'value1': customAttribute2, 'value2': !customAttribute2}}"
 *      ng-click="customAttribute2 = !customAttribute2"
 *      data-test="value2">
 *   Click on me to toggle my data-test attribute value
 * </div>
 *
 * <script>
 *   //code inside the controller
 *   $scope.customAttribute2 = false;
 * </script>
 * ```
 * 
 * Now you also might want to be able to set the value of the attribute to the value of something on the scope.  Well we can handle that too.  In this case you use the :: format for the key however the second part is wrapper in curly brackets instead of just a static value.
 *
 * ```html
 * <div nag-attribute="{'data-test::{attributeValue}': true}">
 *   Attribute value based on property of the scope
 * </div>
 *
 * <script>
 *   //code inside the controller
 *   $scope.attributeValue = 'attribute-value';
 *
 *   //this value would change based on something somewhere down the road... 
 * </script>
 * ```
 *
 * @module nag.attribute
 * @ngdirective nagAttribute
 *
 * @nghtmlattribute {expression} nag-attribute Expression with attributes, values and they conditions for showing
 */
angular.module('nag.attribute')
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
