describe('directive tests', function () {
  var mockScope, compileService;

  beforeEach(angular.mock.module('exampleApp'));

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    mockScope = $rootScope.$new();
    compileService = $compile;
    mockScope.data = [
      {name: 'pippo'},
      {name: 'pluto'},
      {name: 'paperino'}
    ]
  }));

  it('should generate list elements', function () {
    var compileFn = compileService('<div unordered-list="data"></div>');
    var elem = compileFn(mockScope);

    expect(elem.children('ul').length).toEqual(1);
    expect(elem.find('li').length).toEqual(3);
  });

});
