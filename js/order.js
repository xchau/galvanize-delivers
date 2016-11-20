$('.button-collapse').sideNav(); // materialize init

(function() {
  'use strict';

  // TABLE SELECTORS
  const $allButtonsDiv = $('#allButtonsDiv');
  const $tbody = $('tbody');
  const $currentSubtotal = $('#subtotal');
  const $currentTax = $('#tax');
  const $currentTotal = $('#total');

  // ROYALE PARTS
  const $trRoyale = $('<tr>');
  const $tdRoyale = $('<td>');
  const $tdRoyaleQuantity = $('<td>');
  const $tdRoyalePrice = $('<td>');

  // ARUGULA PARTS
  const $trArugula = $('<tr>');
  const $tdArugula = $('<td>');
  const $tdArugulaQuantity = $('<td>');
  const $tdArugulaPrice = $('<td>');

  // RIBS PARTS
  const $trRibs = $('<tr>');
  const $tdRibs = $('<td>');
  const $tdRibsQuantity = $('<td>');
  const $tdRibsPrice = $('<td>');

  // BISCUIT PARTS
  const $trBiscuit = $('<tr>');
  const $tdBiscuit = $('<td>');
  const $tdBiscuitQuantity = $('<td>');
  const $tdBiscuitPrice = $('<td>');

  // QUANITY COUNTER
  const quantity = [0, 0, 0, 0];

  const createEntry = function(name, price) {
    if (name === 'Royale with Cheese') {
      quantity[0] += 1;
      $tdRoyale.text(name);
      $tdRoyaleQuantity.addClass('center-align').text(quantity[0]);
      $tdRoyalePrice.addClass('right-align').text(price);
      $trRoyale.append($tdRoyale, $tdRoyaleQuantity, $tdRoyalePrice);
      $tbody.append($trRoyale);
    }
    if (name === 'Arugula Pie') {
      quantity[1] += 1;
      $tdArugula.text(name);
      $tdArugulaQuantity.addClass('center-align').text(quantity[1]);
      $tdArugulaPrice.addClass('right-align').text(price);
      $trArugula.append($tdArugula, $tdArugulaQuantity, $tdArugulaPrice);
      $tbody.append($trArugula);
    }
    if (name === 'Smoked Swine') {
      quantity[2] += 1;
      $tdRibs.text(name);
      $tdRibsQuantity.addClass('center-align').text(quantity[2]);
      $tdRibsPrice.addClass('right-align').text(price);
      $trRibs.append($tdRibs, $tdRibsQuantity, $tdRibsPrice);
      $tbody.append($trRibs);
    }
    if (name === 'Ice Cream Biscuit') {
      quantity[3] += 1;
      $tdBiscuit.text(name);
      $tdBiscuitQuantity.addClass('center-align').text(quantity[3]);
      $tdBiscuitPrice.addClass('right-align').text(price);
      $trBiscuit.append($tdBiscuit, $tdBiscuitQuantity, $tdBiscuitPrice);
      $tbody.append($trBiscuit);
    }
  };

  // CALCULATE SUBTOTAL
  const genSubtotal = function(price) {
    const priceRegEx = price.match(/(\$*)(\d+.\d*)/);
    const oldSub = $currentSubtotal.text().match(/(\$*)(\d+.\d*)/);
    const sum = (parseFloat(oldSub[2]) + parseFloat(priceRegEx[2])).toFixed(2);

    $currentSubtotal.text(`$${sum}`);
  };

  // CALCULATE TAX
  const genTax = function() {
    const subtotalRegex = $currentSubtotal.text().match(/(\$*)(\d+.\d*)/);
    const tax = (parseFloat(subtotalRegex[2]) * 0.096).toFixed(2);
    $currentTax.text(`$${tax}`);
  };

  // CALCULATE GRAND TOTAL
  const genTotal = function() {
    const subtotalRegex = $currentSubtotal.text().match(/(\$*)(\d+.\d*)/);
    const taxRegex = $currentTax.text().match(/(\$*)(\d+.\d*)/);
    const grandTotal = (parseFloat(subtotalRegex[2]) + parseFloat(taxRegex[2])).toFixed(2);
    $currentTotal.text(`$${grandTotal}`);
  };

  // CLICK HANDLER
  $allButtonsDiv.on('click', '.order-link', (event) => {
    const $target = $(event.target);
    const $contentDiv = $target.parent().siblings().eq(1);
    const $foodName = $contentDiv.children().eq(0).text();
    const $foodPrice = $contentDiv.children().eq(1).text();

    createEntry($foodName, $foodPrice);
    genSubtotal($foodPrice);
    genTax();
    genTotal();
  });
})();
