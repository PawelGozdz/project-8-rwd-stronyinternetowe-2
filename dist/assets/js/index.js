"use strict";var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}document.querySelector(".navbar ul li:last-child").style.display="none";var state={},elements={category:document.querySelectorAll(".services__link"),servicesOptionItem:"services__option",servicesOption:document.querySelectorAll(".services__options"),servicesOptions:document.querySelector(".services__options"),servicesBar:document.querySelector(".services__bar"),boxHeading:document.querySelectorAll(".box-heading"),articlesSection:document.querySelector(".articles"),articlesList:document.querySelectorAll(".articles__item")},Category=function(){function e(){_classCallCheck(this,e),this.categories=[]}return _createClass(e,[{key:"addCategory",value:function(e){var t=this;"Pokaż wszystko"!==e?this.categories.push(e):"Pokaż wszystko"!=e&&"Ukryj wszystko"!=e||this.categories.length!=elements.boxHeading.length-1?(this.categories=[],0==this.categories.length&&elements.boxHeading.forEach(function(e){"Pokaż wszystko"!==e.textContent&&t.categories.push(e.textContent)})):this.categories=[]}},{key:"deleteCategory",value:function(e){var t=this.categories.indexOf(e);this.categories.splice(t,1)}}]),e}(),Option=function(){function e(t){_classCallCheck(this,e),this.category=t}return _createClass(e,[{key:"createElement",value:function(e){var t=document.createElement("span");t.className="services__text",t.textContent=""+e,document.createElement("span").className="services__close";var n=document.createElement("span");return n.className="services__option  services__option--"+adjustClassName(e),n.appendChild(t),{optionItem:n,cssClassModifier:adjustClassName(e)}}}]),e}(),selectCategories=function(e,t){if(state.categories&&t)state.categories.categories.indexOf(e)>-1?state.categories.deleteCategory(e):state.categories.addCategory(e);else{console.log(t);var n=new Category;state.categories=n,n.addCategory(e)}},adjustClassName=function(e){for(var t=["ą","ę","ć","ł","ó","ź","ż"],n=["a","e","c","l","o","z","z"],o=e,s=0;s<o.length;s++)if(-1!==t.indexOf(o[s])){var a=t.indexOf(o[s]);o=o.replace(t[a],n[a])}return o.split(" ")[0].toLowerCase()},createElements=function(e){if(state.optionElements=[],e.length>0){elements.servicesBar.style.display="inline-block";e.forEach(function(e,t){var n=new Option(e).createElement(e);state.optionElements.push(n)})}else elements.servicesBar.style.display="none"},displayArticles=function(e){var t=document.querySelectorAll(".articles__categories");Array.from(t).forEach(function(e){e.parentElement.parentElement.parentElement.style.display="none"}),0!==state.categories.categories.length?(elements.articlesSection.style.display="block",Array.from(t).forEach(function(t){Array.from(t.children).forEach(function(t){Array.from(e).forEach(function(e){if(t.classList.contains("articles__category--"+adjustClassName(e))){var n=document.querySelectorAll(".articles__category--"+adjustClassName(e));Array.from(n).forEach(function(e){e.closest("ul li").style.display="inline-block"})}})})})):elements.articlesSection.style.display="none"},appInit=function(e){var t=e.target.closest(".services__link").querySelector(".box-heading").textContent;selectCategories(t,state.categories),createElements(state.categories.categories),elements.servicesOptions.innerHTML="",state.optionElements.forEach(function(e){elements.servicesOptions.appendChild(e.optionItem)}),displayArticles(state.categories.categories)},init=function(){Array.from(elements.category).forEach(function(e){e.addEventListener("click",appInit)})};function validateForm(e){e.preventDefault();document.querySelector('#contact-form input[type="submit"]');var t=document.querySelector('#contact-form input[name="name"]'),n=document.querySelector('#contact-form input[name="email"]'),o=document.querySelector("#contact-form textarea"),s=/^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z0-9]){2,4}$/.test(n.value),a=[],r=[];t.value?(r.push(t),a.push(!0)):(r.push(t),a.push(!1)),s?(r.push(n),a.push(!0)):(r.push(n),a.push(!1)),o.value?(r.push(o),a.push(!0)):(r.push(o),a.push(!1));var c=validationMessage(a,r);if("undefined"!==c){var i=JSON.stringify({name:c[0].value,email:c[1].value,text:c[2].value}),l=new XMLHttpRequest;l.open("POST","assets/php/send.php",!0),l.setRequestHeader("Content-Type","application/json"),l.onreadystatechange=function(e){200==this.status||4==this.readyState?this.responseText.includes("Success")&&(console.log("Odbieram"),document.querySelector("form").innerHTML="Dziękuję za wiadomość."):console.log("Cos nie tak z kodem 200 lub 4")},l.send(i)}else console.log("Coś nie tak z obiektem data, w którym zapisane są dane z inputu")}function validationMessage(e,t){var n=document.createElement("p");e.forEach(function(e,n){1==e?t[n].style.border="1px solid green":0==e?t[n].style.border="1px solid red":console.log("Something wrong, not bool value")}),n.classList.add("message");var o=document.querySelector("#contact-form");if(document.querySelector("#contact-form .message")||o.insertAdjacentElement("beforeend",n),!(e.indexOf(!1)>-1))return n.textContent="Wiadomość wysłana!",n.style.border="1px solid green",n.style.color="green",document.querySelectorAll(".inputField").forEach(function(e){setTimeout(function(){e.style.border="none",t[2].style.border="2px solid #222"},3500)}),t;n.textContent="Czerwone pola są wymagane",n.style.border="1px solid red",n.style.color="red"}init(),document.querySelector("#contact-form")&&document.querySelector("#contact-form").addEventListener("submit",validateForm);var element=document.querySelector(".info"),btn=document.querySelector(".go-to__services");element&&btn&&btn.addEventListener("click",function(e){e.preventDefault(),element.scrollIntoView({behavior:"smooth"})});