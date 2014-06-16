describe('first test', function () {

  var controller, backend, mockScope = {}, mockInterval, mockTimeout;

  beforeEach(angular.mock.module('exampleApp'));

  beforeEach(angular.mock.inject(function ($httpBackend) {
    backend = $httpBackend;

    backend.expect('GET', 'productData.json')
        .respond([
          { name: 'apples', category: 'fruit', price: 1.20 },
          { name: 'bananas', category: 'fruit', price: 2.42 },
          { name: 'pears', category: 'fruit', price: 2.02 }
        ]);
  }));

  beforeEach(angular.mock.inject(function ($controller, $rootScope, $http, $interval, $timeout) {
    mockScope = $rootScope.$new();
    mockInterval = $interval;
    mockTimeout = $timeout;

    controller = $controller('defaultCtrl', {
      $scope: mockScope,
      $http: $http,
      $interval: $interval,
      $timeout: $timeout
    });

    backend.flush();
  }));

  it('should create the counter', function () {
    expect(mockScope.counter).toEqual(0);
  });

  it('should increment counter', function () {
    mockScope.incrementCounter();
    expect(mockScope.counter).toEqual(1);
  });

  it('should make an ajax call', function () {
    backend.verifyNoOutstandingExpectation();
  });

  it('should process the data', function () {
    expect(mockScope.products).toBeDefined();
    expect(mockScope.products.length).toEqual(3);
  });

  it('should preserve order', function () {
    expect(mockScope.products.map(function(p) { return p.name }))
        .toEqual(['apples', 'bananas', 'pears']);
  });

  it('should not increase interval counter before 5000ms', function(){
    mockInterval.flush(4999);
    expect(mockScope.intervalCounter).toEqual(0);
  });

  it('should increase interval counter at 5000ms', function(){
    mockInterval.flush(5000);
    expect(mockScope.intervalCounter).toEqual(1);
  });

  it('should not increase interval counter after 10 times', function(){
    mockInterval.flush(5000 * 11);
    expect(mockScope.intervalCounter).toEqual(10);
  });

  it('should increase timeout counter', function(){
    mockTimeout.flush(5000);
    expect(mockScope.timerCounter).toEqual(1);
    mockTimeout.verifyNoPendingTasks();
  });

});