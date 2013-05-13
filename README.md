Attribute (Directive)
=====================

This allow you to dynamically be able to add or change attribute values for an element. There are a 2 different formats the this object can be formatted in.

The first format if where the key hass both the attribute name and value separated by a double colon (::) and the value is the conditional that determines whether or not this attribute/value value should be on the element. This format is good for an attribute that will allows have one value and eiher should or should not be there.

The second format is good for attribute that should always be on the element but you want to be able to toggle the value of the attribute. In the second format, the key of the object is the name of the attribute and the value is another object. That object value with have multiple properties with the name if the value for the attribute and the value is the consitional to check to see if that should be the value of the attribute.

HTML Attributes
===============

* nag-attribute - Object mapping attributes and value to conditional to check to determine if/what value as attribute should have. Read the description above to see the different format this can be structured in.

Example Code
============

Javascript
```javascript
angular.module('docs.attribute', [])
.controller('AttributeCtrl', ['$scope', function($scope) {
  $scope.customAttribute = false;
    $scope.customAttribute2 = false;
    $scope.customAttribute3 = false;
    $scope.customAttribute4 = false;

    $scope.customFunction = function() {
      $scope.customAttribute3 = !$scope.customAttribute3;
      $scope.customAttribute4 = !$scope.customAttribute4;
    }
}]);
```

HTML
```html
<div style="cursor: pointer" nag-attribute="{'data-test::on': customAttribute}" ng-click="customAttribute = !customAttribute">
  Click on me to toggle my data-test attribute on/off
</div>
<div style="cursor: pointer" nag-attribute="{'data-test': {'value1': customAttribute2, 'value2': !customAttribute2}}" ng-click="customAttribute2 = !customAttribute2">
  Click on me to toggle my data-test attribute value
</div>
<div style="cursor: pointer" nag-attribute="{'data-test::on': customAttribute3, 'data-test2': {'value1': customAttribute4, 'value2': !customAttribute4}}" ng-click="customFunction()">
  Click on me to toggle my data-test attribute on/off and data-test2 attribute value
</div>
```
