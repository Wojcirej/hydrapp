"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const buttonAdd = document.querySelector('.glass__add-js');
const buttonRemove = document.querySelector('.glass__remove-js');
const value = document.querySelector('.glass__counter-js');
const key = new Date().toISOString().slice(0, 10);

function isValueForTodaySet() {
  return Boolean(localStorage.getItem(key));
};

function setInitialGlassCount() {
  localStorage.setItem(key, 0);
  value.innerHTML = '0';
};

function getGlassCount() {
  return localStorage.getItem(key);
};

function insertGlassCountOnPage() {
  value.innerHTML = getGlassCount();
};

function addGlass() {
  localStorage.setItem(key, parseInt(localStorage.getItem(key)) + 1);
};

function removeGlass() {
  if (noWaterDrank()) return;
  localStorage.setItem(key, parseInt(localStorage.getItem(key)) - 1);
}

function noWaterDrank() {
  return getGlassCount() <= 0;
};

if (isValueForTodaySet()) {
  insertGlassCountOnPage();
} else {
  setInitialGlassCount();
};

buttonAdd.addEventListener('click', event => {
  addGlass();
  insertGlassCountOnPage();
});

buttonRemove.addEventListener('click', event => {
  removeGlass();
  insertGlassCountOnPage();
});
