angular
  .module("productApp")
  .directive("priceInput", () => {
    return {
      restrict: "E",
      scope: {
        ngModel: "=",
        label: "@",
      },
      template: `
            <div class="form-group">
                <label>{{label}} <i ng-if="ngModelFormatted">(bằng chữ: {{ ngModel | numToWordsFilter }})</i></label>
                <input type="text" class="form-control" ng-model="ngModelFormatted" ng-change="formatInput()">
            </div>
        `,
      link: function (scope) {
        scope.$watch("ngModel", function (newValue) {
          if (newValue || newValue === 0) {
            scope.ngModelFormatted = formatNumber(newValue);
          }
        });

        scope.formatInput = function () {
          let num = scope.ngModelFormatted.replace(/[\D]/g, "");
          if (num) {
            num = parseInt(num, 10);
          }
          if (num > 999999999999) {
            num = 999999999999;
          }
          scope.ngModel = num;
          scope.ngModelFormatted = formatNumber(num);
        };
      },
    };
  })
  .filter("numToWordsFilter", [
    "NumberService",
    function (NumberService) {
      return function (input) {
        if (!input) return "";
        return NumberService.numberToWords(input);
      };
    },
  ]);

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
