angular.module('exampleApp', [])
    .controller('defaultCtrl', function ($scope, $http, $interval, $timeout) {
      $scope.counter = 0;

      $scope.incrementCounter = function () {
        $scope.counter++;
      };

      $http.get('productData.json').success(function (data) {
        $scope.products = data;
      });

      $scope.intervalCounter = 0;
      $scope.timerCounter = 0;

      $interval(function () {
        $scope.intervalCounter++;
      }, 5000, 10);

      $timeout(function () {
        $scope.timerCounter++;
      }, 5000);
    })
    .filter('labelCase', function () {
      return function (value, reverse) {
        if (!angular.isString(value))
          return value;

        var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
        return (reverse ? intermediate[0].toLowerCase() :
            intermediate[0].toUpperCase()) + intermediate.substr(1);
      };
    })
    .directive('unorderedList', function(){
      return function(scope, element, attrs) {
        var data = scope[attrs['unorderedList']];

        if(angular.isArray(data)) {
          var listElem = angular.element('<ul>');
          element.append(listElem);

          data.forEach(function(item){
            listElem.append(angular.element('<li>').text(item.name));
          });
        }
      };
    });