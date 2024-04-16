const app = angular.module("productApp", []);

class ProductController {
  constructor($http) {
    var vm = this;
    vm.product = {};
    vm.$http = $http;

    vm.submitProduct = function () {
      console.log(vm.product);

      // vm.$http.post('/api/product', vm.product).then(response => {
      //   console.log('Product submitted successfully');
      // }).catch(error => {
      //   console.error('Error submitting product', error);
      // });
    };
  }
}

app.controller("ProductController", ["$http", ProductController]);
