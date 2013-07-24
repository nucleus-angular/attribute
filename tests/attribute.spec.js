describe('Attribute', function(){
  var $compile, $scope;

  beforeEach(module('nag.attribute'));

  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');

    $scope.attribute1 = false;
    $scope.value1 = null;
    $scope.attribute2 = false;
  }));

  var setupElement = function(scope, attributeObject) {
    var element = $compile('<div id="element1" nag-attribute="' + attributeObject + '"></div>')(scope);
    scope.$digest();
    return element;
  }

  it('should not have attribute', function() {
    var element = setupElement($scope, "{'data-test::on': attribute1}");

    expect(element.attr('data-test')).toEqual(null);
  });

  it('should be able to set attribute', function() {
    $scope.attribute1 = true;

    var element = setupElement($scope, "{'data-test::on': attribute1}");

    expect(element.attr('data-test')).toEqual('on');
  });

  it('should be able to set attribute value', function() {
    var element = setupElement($scope, "{'data-test': {'value1': !attribute1, 'value2': attribute1}}");

    expect(element.attr('data-test')).toEqual('value1');

    $scope.attribute1 = true;
    $scope.$digest();

    expect(element.attr('data-test')).toEqual('value2');
  });

  it('should be able to have multiple dynamic attribute on the same element', function() {
    var element = setupElement($scope, "{'data-test::on': attribute1, 'data-test2': {'value1': attribute2, 'value2': !attribute2}}");

    expect(element.attr('data-test')).toEqual(null);
    expect(element.attr('data-test2')).toEqual('value2');

    $scope.attribute1 = true;
    $scope.attribute2 = true;
    $scope.$digest();

    expect(element.attr('data-test')).toEqual('on');
    expect(element.attr('data-test2')).toEqual('value1');
  });

  it("should be able to use scope value for attribute value", function() {
    $scope.attribute1 = true;
    $scope.value1 = 'foo'

    var element = setupElement($scope, "{'data-test::{value1}': attribute1}");

    expect(element.attr('data-test')).toEqual('foo');
  });

  it("should update attribute value is scope variable changes", function() {
    $scope.attribute1 = true;
    $scope.value1 = 'foo'

    var element = setupElement($scope, "{'data-test::{value1}': attribute1}");

    $scope.value1 = 'bar';
    $scope.$digest();

    expect(element.attr('data-test')).toEqual('bar');
  });
});
