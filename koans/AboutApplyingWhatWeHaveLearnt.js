var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      var isMushrooms = function(ingr) {return ingr === "mushrooms"};
      var isGood = function(prod) {return prod.containsNuts === false && _(prod.ingredients).any(isMushrooms) === false};
      productsICanEat = _(products).filter(isGood);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = FILL_ME_IN;    /* try chaining range() and reduce() */

    var reduct = function(s, x) {
      var ret = s;
      if (x % 3 === 0 || x % 5 === 0) {
        ret += x;
      }
      return ret;
    };
    sum = _(_.range(1000)).chain().reduce(reduct).value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    var reduct = function(s, i) { ingredientCount[i] = (ingredientCount[i] || 0) + 1; };
    _(products).chain().map(function(p) {return p.ingredients}).flatten().reduce(reduct);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var lpfcn = function(n) {
      var ret = 2;
      for (i = Math.trunc(Math.sqrt(n)); i > 1; i -= 1) {
        if ((n % i === 0) && (isPrime(i) === true)) {
          ret = i;
          break;
        }
      }
      return ret;
    }

    var isPrime = function(n) {
      var ret = true;
      for (j = 2; j <= Math.sqrt(n); j += 1) {
        if (n % j === 0) {
          ret = false;
          break;
        }
      }
      return ret;
    }

    expect(lpfcn(24)).toBe(3);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var lp = function() {
      var ret;
      var a, b, c, n;
      iter: {
        for (a = 9; a > 0; a -= 1) {
          for (b = 9; b >= 0; b -= 1) {
            for (c = 9; c >= 0; c -= 1) {
              n = a * 100001 + b * 10010 + c * 1100;
              if (isProd(n) == true) {
                ret = n;
                break iter;
              }
            }
          }
        }
      }
      return ret;
    }

    var isProd = function(n) {
      var ret = false;
      for (i = 100; i < 1000; i += 1) {
        if (n % i === 0 && n / i < 1000 && n / i > 99) {
          ret = true;
          break;
        }
      }
      return ret;
    }

    expect(lp()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var sn = function(n) {
      var ret = 1;
      var used = [];
      for (i = 2; i <= n; i += 1) {
        if (used[i] === undefined) {
          var x = i;
          for (j = 2; j < n; j += 1) {
            if (x * i > n) {
              break;
            }
            x *= i;
          }
          ret *= x;
          for (j = 2; j <= n / i; j += 1) {
            used[i * j] = true;
          }
        }
      }
      return ret;
    }

    expect(sn(20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var dif = function() {
      var sumOfSquares = 0, squareOfSum = 0;
      for (i = 0; i < arguments.length; i += 1) {
        sumOfSquares += arguments[i] * arguments[i];
        squareOfSum += arguments[i];
      }
      squareOfSum *= squareOfSum;
      return squareOfSum - sumOfSquares;
    }

    expect(dif(10, 20, 30)).toBe(2200);
  });

  it("should find the 10001st prime", function () {
    var nthPrime = function(n) {
      var found = 0;
      var limit = 2 * n * Math.log(n);
      var used = [];
      for (i = 2; true; i++) {
        if (used[i] == undefined) {
          found += 1;
          if (found >= n) { break; }
          for (j = i; true; j += 1) {
            var x = i * j;
            if (x > limit) { break; }
            used[x] = true;
          }
        }
      }
      return i;
    }

    expect(nthPrime(10001)).toBe(104743);
  });

});
