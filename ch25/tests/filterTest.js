describe('filter tests', function () {
  var filterInstance;

  beforeEach(angular.mock.module('exampleApp'));

  beforeEach(angular.mock.inject(function($filter){
    filterInstance = $filter('labelCase');
  }));

  it('should change case', function(){
    var result = filterInstance('test phrase');
    expect(result).toEqual('Test phrase');
  });

  it('should reverse case', function(){
    var result = filterInstance('test phrase', true);
    expect(result).toEqual('tEST PHRASE');
  });

});