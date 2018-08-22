'use strict';


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *
*/            

document.querySelector('.navbar ul li:last-child').style.display = 'none';

// Main cotrol object
var state = {};

// ELEMENTS
var elements = {
  category: document.querySelectorAll('.services__link'),
  servicesOptionItem: 'services__option',
  servicesOption: document.querySelectorAll('.services__options'),
  servicesOptions: document.querySelector('.services__options'),
  servicesBar: document.querySelector('.services__bar'),
  boxHeading: document.querySelectorAll('.box-heading'),
  articlesSection: document.querySelector('.articles'),
  articlesList: document.querySelectorAll('.articles__item')
};

// Chosen category

var Category = function () {
  function Category() {
    _classCallCheck(this, Category);

    this.categories = [];
  }

  _createClass(Category, [{
    key: 'addCategory',
    value: function addCategory(category) {
      var _this = this;

      if (category !== 'Pokaż wszystko') {
        this.categories.push(category);
      } else if ((category == 'Pokaż wszystko' || category == 'Ukryj wszystko') && this.categories.length == elements.boxHeading.length - 1) {
        this.categories = [];
      } else {
        this.categories = [];
        if (this.categories.length == 0) {
          elements.boxHeading.forEach(function (el) {
            if (el.textContent !== 'Pokaż wszystko') {
              _this.categories.push(el.textContent);
            }
          });
        }
      }
    }
  }, {
    key: 'deleteCategory',
    value: function deleteCategory(category) {
      var index = this.categories.indexOf(category);
      this.categories.splice(index, 1);
    }
  }]);

  return Category;
}();

;

// Categories print in the bar

var Option = function () {
  function Option(category) {
    _classCallCheck(this, Option);

    this.category = category;
  }

  _createClass(Option, [{
    key: 'createElement',
    value: function createElement(category) {

      var spanText = document.createElement('span');
      spanText.className = 'services__text';
      spanText.textContent = '' + category;

      var spanClose = document.createElement('span');
      spanClose.className = "services__close";

      var span = document.createElement('span');
      span.className = 'services__option  services__option--' + adjustClassName(category);

      span.appendChild(spanText);
      //span.appendChild(spanClose);

      //   const optionItem = `
      //   <span class="services__option services__option--${adjustClassName(category)}">
      //     <span class="services__text">${category}</span>
      //     <span class="services__close"></span>
      //   </span>
      // `;

      return {
        optionItem: span,
        cssClassModifier: adjustClassName(category)
      };
    }
  }]);

  return Option;
}();

;

var selectCategories = function selectCategories(categoryName, updatedList) {
  var rightOne = '';

  // if(!selectedCategory)

  if (!state.categories || !updatedList) {
    console.log(updatedList);
    var newObjCategory = new Category();
    state.categories = newObjCategory;
    newObjCategory.addCategory(categoryName);
  } else {
    if (state.categories.categories.indexOf(categoryName) > -1) {
      state.categories.deleteCategory(categoryName);
    } else {
      state.categories.addCategory(categoryName);
    }
  }
};

var adjustClassName = function adjustClassName(category) {
  var polish = ['ą', 'ę', 'ć', 'ł', 'ó', 'ź', 'ż'];
  var english = ['a', 'e', 'c', 'l', 'o', 'z', 'z'];
  var replaced = category;
  // Replacing polish letters
  for (var i = 0; i < replaced.length; i++) {
    if (polish.indexOf(replaced[i]) !== -1) {
      var index = polish.indexOf(replaced[i]);
      replaced = replaced.replace(polish[index], english[index]);
    }
  }
  var fixedCategory = replaced.split(' ')[0].toLowerCase();

  // Returning the first word of the string in lower letters, with polish letters replaced
  return fixedCategory;
};

var createElements = function createElements(selectedCategories) {
  state.optionElements = [];

  if (selectedCategories.length > 0) {
    elements.servicesBar.style.display = 'inline-block';
    var selectedList = '';
    selectedCategories.forEach(function (el, index) {
      var category = new Option(el);
      var element = category.createElement(el);
      state.optionElements.push(element);
    });
  } else {
    elements.servicesBar.style.display = 'none';
  }
};

// Adding listeners to newly created options in the bar
// const addClickToOption = (categories) => {
//   const items = Array.from(document.querySelectorAll('.services__option'));
//   items.forEach(el => {
//     el.addEventListener('click', (e) => {
//       const click = e.target.closest('div .services__option');
//       const clickToDelete = click.children[0].textContent;
//       console.log('This category needs to be removed: ' + clickToDelete);
//       console.log(categories);


//       state.categories.deleteCategory(clickToDelete);
//       console.log(state.categories);
//       //selectCategories(clickToDelete);

//     });
//   });
// };

// Display LI elements based on categories input
var displayArticles = function displayArticles(categories) {
  var allArticles = document.querySelectorAll('.articles__categories');

  // Chowanie calej listy po kazdym kliknieciu by ja wyswietlic pozniej zaleznie od wybranych opcji
  Array.from(allArticles).forEach(function (el) {
    el.parentElement.parentElement.parentElement.style.display = 'none';
  });

  if (state.categories.categories.length !== 0) {
    elements.articlesSection.style.display = 'block';
    // Petla przez div z klasa .articles__categories
    Array.from(allArticles).forEach(function (div) {
      // Pobranie jego klass
      Array.from(div.children).forEach(function (element) {
        // pobranie klass z categiries
        Array.from(categories).forEach(function (category) {
          // porownanie o
          if (element.classList.contains('articles__category--' + adjustClassName(category))) {
            var toDisplay = document.querySelectorAll('.articles__category--' + adjustClassName(category));
            Array.from(toDisplay).forEach(function (li) {
              // jezeli jest ok, to wyswietl te klasy
              li.closest('ul li').style.display = 'inline-block';
            });
          }
        });
      });
    });
  } else {
    // Jezeli state.categories.categories jest puste, schowaj wszystkie elementy
    elements.articlesSection.style.display = 'none';
  }
};

var appInit = function appInit(e) {
  // Reading category name and passing it as an argument to selectCategorues function
  var categoryName = e.target.closest('.services__link').querySelector('.box-heading').textContent;
  // Read categories and asign them to state obj
  selectCategories(categoryName, state.categories);

  // Create state css classes obj
  //cssClasses(state.categories.categories);

  // Create options elements
  createElements(state.categories.categories);

  // Prepare UI for the options
  elements.servicesOptions.innerHTML = '';

  // Insert options into the Bar
  state.optionElements.forEach(function (el) {
    elements.servicesOptions.appendChild(el.optionItem);
    // elements.servicesOptions.insertAdjacentHTML('beforeend', el.optionItem);
  });

  // Adding event listeners to the options in the bar
  //const newCategories =  addClickToOption(state.categories.categories);
  //console.log(newCategories);


  // Po clicku do zwrocic reszte listy oraz uaktualnic state.categories.categories


  // Select articles based on what user has selected
  displayArticles(state.categories.categories);
  //
};

/* MAIN CONTROLLER */
var init = function init() {
  // Run app by clicking category
  Array.from(elements.category).forEach(function (el) {
    el.addEventListener('click', appInit);
  });
};

init();

/* END MAIN CONTROLLER */

/**FORM VALIDATION */

function validateForm(e) {
  e.preventDefault();

  var submitBtn = document.querySelector('#contact-form input[type="submit"]');
  var name = document.querySelector('#contact-form input[name="name"]');
  var email = document.querySelector('#contact-form input[name="email"]');
  var textarea = document.querySelector('#contact-form textarea');
  var reg = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z0-9]){2,4}$/;
  var checkedEmail = reg.test(email.value);
  var check = [];
  var elements = [];

  // NAME
  if (name.value) {
    elements.push(name);
    check.push(true);
  } else {
    elements.push(name);
    check.push(false);
  }

  // EMAIL
  if (checkedEmail) {
    elements.push(email);
    check.push(true);
  } else {
    elements.push(email);
    check.push(false);
  }

  // TEXTAREA
  if (textarea.value) {
    elements.push(textarea);
    check.push(true);
  } else {
    elements.push(textarea);
    check.push(false);
  }

  var results = validationMessage(check, elements);

  // console.log(elements);
  if (results !== 'undefined') {
    var data = JSON.stringify({
      name: results[0].value,
      email: results[1].value,
      text: results[2].value
    });

    // results.forEach(el => el.value = '');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/php/send.php', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function (err) {
      if (this.status == 200 || this.readyState == 4) {
        if (this.responseText.includes('Success')) {
          console.log('Odbieram');
          document.querySelector('form').innerHTML = 'Dzi\u0119kuj\u0119 za wiadomo\u015B\u0107.';
        } else {
          // console.log('Coś nie tak z responseText od PHP');
        }
      } else {
        console.log('Cos nie tak z kodem 200 lub 4');
      }
    };
    xhr.send(data);
  } else {
    console.log('Coś nie tak z obiektem data, w którym zapisane są dane z inputu');
  }
}

function validationMessage(boolArr, elementArr) {
  var p = document.createElement('p');
  var successMsg = 'Wiadomość wysłana!';
  var invalidFieldMsg = 'Czerwone pola są wymagane';
  var failureMsg = 'Nie udało się wysłać wiadomości. Spróbuj zadzwonić pod numer 510 502 081!';

  boolArr.forEach(function (bool, index) {
    if (bool == true) {
      elementArr[index].style.border = '1px solid green';
    } else if (bool == false) {
      elementArr[index].style.border = '1px solid red';
    } else {
      console.log('Something wrong, not bool value');
    }
  });

  p.classList.add('message');

  var form = document.querySelector('#contact-form');
  if (!document.querySelector('#contact-form .message')) {
    form.insertAdjacentElement('beforeend', p);

    // Ta funkcja jest zablokowana, gdy php przesyla wiadomosc po wyslaniu formy. W przeciwnym wypadku, JS wywala error, bo ponizszy setTimeout nie moze znalezc .parentElement, gdyz skrypt php nadpisuje cala zawartosc form

    // setTimeout(() => {
    //   const el = document.querySelector('.message');
    //   el.parentElement.removeChild(el);
    // }, 3500);
  }

  if (boolArr.indexOf(false) > -1) {
    p.textContent = invalidFieldMsg;
    p.style.border = '1px solid red';
    p.style.color = 'red';
  } else {
    p.textContent = successMsg;
    p.style.border = '1px solid green';
    p.style.color = 'green';

    // Succesful validation and end of styles 
    var allFields = document.querySelectorAll('.inputField');
    allFields.forEach(function (el) {
      // el.value = '';
      setTimeout(function () {
        el.style.border = 'none';
        elementArr[2].style.border = '2px solid #222';
      }, 3500);
    });

    return elementArr;
  }
}

if (document.querySelector('#contact-form')) {
  document.querySelector('#contact-form').addEventListener('submit', validateForm);
}
/**FORM VALIDATION */

// Smooth scroll 
var element = document.querySelector('.info');
var btn = document.querySelector('.go-to__services');
if (element && btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    element.scrollIntoView({ behavior: "smooth" });
  });
}