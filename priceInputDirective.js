const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const priceInputDirective = () => {
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
    link: (scope) => {
      scope.$watch("ngModel", (newValue) => {
        if (newValue || newValue === 0) {
          scope.ngModelFormatted = formatNumber(newValue);
        }
      });

      scope.formatInput = () => {
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
};

const numToWordsFilterFunc = (NumberService) => {
  return (input) => {
    if (!input) return "";
    return NumberService.numberToWords(input);
  };
};

angular
  .module("productApp")
  .directive("priceInput", priceInputDirective)
  .filter("numToWordsFilter", ["NumberService", numToWordsFilterFunc]);
