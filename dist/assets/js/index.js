/*
 *
*/

// document.querySelector('.navbar ul li:last-child').style.display = 'none';

// Main cotrol object
const state = {};

// ELEMENTS
const elements = {
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
class Category {
  constructor() {
    this.categories = [];
  };

  addCategory(category) {
    if(category !== 'Pokaż wszystko') {
      this.categories.push(category);
    } else if((category == 'Pokaż wszystko' || category == 'Ukryj wszystko') && this.categories.length == elements.boxHeading.length -1) {
      this.categories = [];
    }  else  {
      this.categories = [];
      if(this.categories.length == 0) {
        elements.boxHeading.forEach(el => {
          if(el.textContent !== 'Pokaż wszystko') {
            this.categories.push(el.textContent);
          }
        });
      }
    } 
  }

  deleteCategory(category) {
    const index = this.categories.indexOf(category);
    this.categories.splice(index, 1);
  }
};

// Categories print in the bar
class Option {
  constructor(category) {
    this.category = category;
  }

  createElement(category) {

    const spanText = document.createElement('span');
    spanText.className = 'services__text';
    spanText.textContent = `${category}`;

    const spanClose = document.createElement('span');
    spanClose.className = "services__close";

    const span = document.createElement('span');
    span.className = `services__option  services__option--${adjustClassName(category)}`;

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
  };

};

const selectCategories = (categoryName, updatedList) => {
  let rightOne = '';

  // if(!selectedCategory)

  if(!state.categories || !updatedList) {
    console.log(updatedList);
    const newObjCategory = new Category();
    state.categories = newObjCategory;
    newObjCategory.addCategory(categoryName);
  } else {
    if(state.categories.categories.indexOf(categoryName) > -1) {
      state.categories.deleteCategory(categoryName);
    } else {
      state.categories.addCategory(categoryName);
    }
  }
};

const adjustClassName = (category) => {
  const polish = ['ą', 'ę', 'ć', 'ł', 'ó', 'ź', 'ż'];
  const english = ['a', 'e', 'c', 'l', 'o', 'z', 'z'];
  let replaced = category;
  // Replacing polish letters
  for(let i = 0; i < replaced.length; i++){
    if(polish.indexOf(replaced[i]) !== -1) {
      const index = polish.indexOf(replaced[i]);
      replaced = replaced.replace(polish[index], english[index]);
    }
  }
   const fixedCategory = replaced.split(' ')[0].toLowerCase();

   // Returning the first word of the string in lower letters, with polish letters replaced
   return fixedCategory;
};

const createElements = (selectedCategories) => {
  state.optionElements = [];

  if(selectedCategories.length > 0) {
    elements.servicesBar.style.display = 'inline-block';
    let selectedList = '';
    selectedCategories.forEach((el, index) => {
      const category = new Option(el);
      const element = category.createElement(el);
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
const displayArticles = (categories) => {
  const allArticles = document.querySelectorAll('.articles__categories');

  // Chowanie calej listy po kazdym kliknieciu by ja wyswietlic pozniej zaleznie od wybranych opcji
  Array.from(allArticles).forEach(el => {
    el.parentElement.parentElement.parentElement.style.display = 'none';
  });

  if(state.categories.categories.length !== 0) {
    elements.articlesSection.style.display = 'block';
    // Petla przez div z klasa .articles__categories
    Array.from(allArticles).forEach(div => {
      // Pobranie jego klass
      Array.from(div.children).forEach(element => {
        // pobranie klass z categiries
        Array.from(categories).forEach(category => {
          // porownanie o
          if(element.classList.contains(`articles__category--${adjustClassName(category)}`)) {
            const toDisplay = document.querySelectorAll(`.articles__category--${adjustClassName(category)}`);
            Array.from(toDisplay).forEach(li => {
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

const appInit = (e) => {
  // Reading category name and passing it as an argument to selectCategorues function
  const categoryName = e.target.closest('.services__link').querySelector('.box-heading').textContent;
  // Read categories and asign them to state obj
  selectCategories(categoryName, state.categories);
  
  // Create state css classes obj
  //cssClasses(state.categories.categories);
  
  // Create options elements
  createElements(state.categories.categories);
  
  // Prepare UI for the options
  elements.servicesOptions.innerHTML = '';
  
  // Insert options into the Bar
  state.optionElements.forEach(el => {
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
}


/* MAIN CONTROLLER */
const init = () => {
  // Run app by clicking category
  Array.from(elements.category).forEach(el => {
    el.addEventListener('click', appInit);
  });

};

init();
  
  /* END MAIN CONTROLLER */
  
  
/**FORM VALIDATION */

function validateForm(e) {
  e.preventDefault();

  const submitBtn = document.querySelector('#contact-form input[type="submit"]');
  const name = document.querySelector('#contact-form input[name="name"]');
  const email = document.querySelector('#contact-form input[name="email"]');
  const textarea = document.querySelector('#contact-form textarea');
  const reg = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z0-9]){2,4}$/;
  const checkedEmail = reg.test(email.value);
  const check = [];
  const elements = [];

  // NAME
  if(name.value) {
    elements.push(name);
    check.push(true);
  } else {
    elements.push(name);
    check.push(false);
  }
  
  // EMAIL
  if(checkedEmail) {
    elements.push(email);
    check.push(true);
  } else {
    elements.push(email);
    check.push(false);
  }
  
  // TEXTAREA
  if(textarea.value) {
    elements.push(textarea);
    check.push(true);
  } else {
    elements.push(textarea);
    check.push(false);
  }

  const results = validationMessage(check, elements);

  // console.log(elements);
  if(results !== 'undefined') {
    const data = JSON.stringify(
      {
        name : results[0].value,
        email: results[1].value,
        text: results[2].value
      }
    );
    
    // results.forEach(el => el.value = '');
 
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'assets/php/send.php', true);
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onreadystatechange = function(err) {
      if(this.status == 200 || this.readyState == 4) {
        if(this.responseText.includes('Success')) {
            console.log('Odbieram');
            document.querySelector('form').innerHTML = `Dziękuję za wiadomość.`;
          } else {
            // console.log('Coś nie tak z responseText od PHP');
          }
      } else {
        console.log('Cos nie tak z kodem 200 lub 4');
      }
    };
    xhr.send(data);
  } else {
    console.log('Coś nie tak z obiektem data, w którym zapisane są dane z inputu')
  }

}

function validationMessage(boolArr, elementArr) {
  const p = document.createElement('p');
  const successMsg = 'Wiadomość wysłana!';
  const invalidFieldMsg = 'Czerwone pola są wymagane';
  const failureMsg = 'Nie udało się wysłać wiadomości. Spróbuj zadzwonić pod numer 510 502 081!';

  boolArr.forEach((bool, index) => {
    if(bool == true) {
      elementArr[index].style.border = '1px solid green'
    } else if(bool == false) {
      elementArr[index].style.border = '1px solid red'
    } else {
      console.log('Something wrong, not bool value')
    }
  });

  p.classList.add('message');

  const form = document.querySelector('#contact-form');
  if(!document.querySelector('#contact-form .message')) {
    form.insertAdjacentElement('beforeend', p);

    // Ta funkcja jest zablokowana, gdy php przesyla wiadomosc po wyslaniu formy. W przeciwnym wypadku, JS wywala error, bo ponizszy setTimeout nie moze znalezc .parentElement, gdyz skrypt php nadpisuje cala zawartosc form

    // setTimeout(() => {
    //   const el = document.querySelector('.message');
    //   el.parentElement.removeChild(el);
    // }, 3500);
    
  }
  
  if(boolArr.indexOf(false) > -1) {
    p.textContent = invalidFieldMsg;
    p.style.border = '1px solid red';
    p.style.color = 'red';

    
  } else {
    p.textContent = successMsg;
    p.style.border = '1px solid green';
    p.style.color = 'green';

    // Succesful validation and end of styles 
    const allFields = document.querySelectorAll('.inputField');
    allFields.forEach(el => {
      // el.value = '';
      setTimeout(() => {
        el.style.border = 'none';
        elementArr[2].style.border = '2px solid #222';
      }, 3500);
    });

    return elementArr;
  }
}

if(document.querySelector('#contact-form')) {
  document.querySelector('#contact-form').addEventListener('submit', validateForm);
  
}
/**FORM VALIDATION */

// Smooth scroll 
const smoothElement = document.querySelector('.info');
const smoothBtn = document.querySelector('.go-to__services');
const developerCategories = [...document.querySelectorAll('.developer__category .developer__link')];
const categoriesToGoTo = [...document.querySelectorAll('.developer__section')];

// Index page
if(smoothElement && smoothBtn) {
  smoothBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    smoothElement.scrollIntoView({behavior: "smooth"});
  });
}

// Developer page

function scrollToSection(e) {
  // e.preventDefault();
  const getAttr = e.target.getAttribute('href').replace('#', '');
  const goTo = categoriesToGoTo.filter((el) => el.getAttribute('id') == getAttr);
  console.log(goTo);
  goToElement(gotTo[0]);
}


developerCategories.forEach(el => {
  el.addEventListener('click', scrollToSection);
});


