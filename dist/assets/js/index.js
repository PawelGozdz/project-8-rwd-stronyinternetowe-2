/*
1. Add Listeners on page load to buttons
2. Grab all buttons
3. Display 'h2 element'
4. Grab all article elements
4. 
*/
// Main cotrol object
const state = {};

// ELEMENTS
const elements = {
  category: document.querySelectorAll('.services__link'),
  servicesOption: document.querySelectorAll('.services__option'),
  servicesOptions: document.querySelector('.services__options'),
  servicesBar: document.querySelector('.services__bar'),
  boxHeading: document.querySelectorAll('.box-heading')
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
    } else  {
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
    this.optionsArr = [];
  }

  adjustClassName(category) {
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

     // Returning the first word od the string, with polish letters replaced and in lower letters
     return fixedCategory;
  }

  addOption(category) {
    const option = `
    <span class="services__option services__option--${this.adjustClassName(category)}">
      <span class="services__text">${category}</span>
      <span class="services__close"></span>
    </span>
  `;
    
    return option;
  };

  removeOption() {
    console.log('Remove from list');
  };
};

const selectCategories = (e) => {
  const selectedCategory = e.target.closest('.services__link').querySelector('.box-heading').textContent;

  if(!state.categories) {
    const newObjCategory = new Category();
    state.categories = newObjCategory;
    newObjCategory.addCategory(selectedCategory);
  } else {
    if(state.categories.categories.indexOf(selectedCategory) > -1) {
      state.categories.deleteCategory(selectedCategory);;
    } else {
      state.categories.addCategory(selectedCategory);
    }
  }
};

const printOptions = (selectedCategories) => {

  if(selectedCategories.length > 0) {
    elements.servicesBar.style.display = 'inline-block';
    let selectedList = '';
    selectedCategories.forEach((el, index) => {
      const category = new Option(el);
      const element = category.addOption(el);
      selectedList += element;

      // Deleting alreay listed and replacing with the new ones
      elements.servicesOptions.innerHTML = '';
      // Inserting HTML
      elements.servicesOptions.insertAdjacentHTML('beforeend', selectedList);

    });
  } else {
    elements.servicesBar.style.display = 'none';
  }
};

Array.from(elements.servicesOption).forEach(el => {
  el.addEventListener('click', Option.removeOption)
});




/* MAIN CONTROLLER */
Array.from(elements.category).forEach(el => {
  el.addEventListener('click', (e) => {
    // Choose categories
    selectCategories(e);

    // Get options from the state.categories
    const selectedCategories = state.categories.categories;
    console.log(selectedCategories);

    // Print options in the bar
    printOptions(selectedCategories);

    // Return  new selectedCategories
    // updateOptions(selectedCategories);
    
    // Delete category by clicking an option
    // removeOption();

    // Select articles based on what user has selected

  });
});

/* END MAIN CONTROLLER */
