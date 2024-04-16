const app = angular.module("productApp", []);


const controllerFunc =  ($scope, $http) => {
    $scope.product = {};
    $scope.submitProduct =  () => {
      console.log($scope.product);

      // var url = "url";
      // var data = $scope.product;

      // $http.post(url, data).then(
      //    (response) => {
      //     console.log("Product submitted successfully!", response);
      //   },
      //    (error) => {
      //     console.log("Error submitting product", error);
      //   }
      // );
    };
  }

  app.controller("ProductController", ["$scope", "$http", controllerFunc]);
