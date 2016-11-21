(function() {
  'use strict';

  // MATERIALIZE
  $('.button-collapse').sideNav();
  $(document).ready(function() {
    $('input#input_text, textarea#textarea1').characterCounter();
  });

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
      $tbody.prepend($trRoyale);
    }
    if (name === 'Arugula Pie') {
      quantity[1] += 1;
      $tdArugula.text(name);
      $tdArugulaQuantity.addClass('center-align').text(quantity[1]);
      $tdArugulaPrice.addClass('right-align').text(price);
      $trArugula.append($tdArugula, $tdArugulaQuantity, $tdArugulaPrice);
      $tbody.prepend($trArugula);
    }
    if (name === 'Smoked Swine') {
      quantity[2] += 1;
      $tdRibs.text(name);
      $tdRibsQuantity.addClass('center-align').text(quantity[2]);
      $tdRibsPrice.addClass('right-align').text(price);
      $trRibs.append($tdRibs, $tdRibsQuantity, $tdRibsPrice);
      $tbody.prepend($trRibs);
    }
    if (name === 'Ice Cream Biscuit') {
      quantity[3] += 1;
      $tdBiscuit.text(name);
      $tdBiscuitQuantity.addClass('center-align').text(quantity[3]);
      $tdBiscuitPrice.addClass('right-align').text(price);
      $trBiscuit.append($tdBiscuit, $tdBiscuitQuantity, $tdBiscuitPrice);
      $tbody.prepend($trBiscuit);
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
    const sub = parseFloat(subtotalRegex[2]);
    const tax = parseFloat(taxRegex[2]);
    const grandTotal = (sub + tax).toFixed(2);

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

  const warning = 'This field is required*';
  const $nameField = $('#name');

  // FOCUS IN & OUT in EMPTY NAME FIELD
  $nameField.focusout(() => {
    if (!$nameField.prop('value')) {
      $nameField.prop('placeholder', warning);
    }
  });
  $nameField.focusin(() => {
    $nameField.prop('placeholder', '');
  });

  const $phoneField = $('#phoneNumber');

  // FOCUS IN & OUT in EMPTY PHONE FIELD
  $phoneField.focusout(() => {
    if (!$phoneField.prop('value')) {
      $phoneField.prop('placeholder', warning);
    }
  });
  $phoneField.focusin(() => {
    $phoneField.prop('placeholder', '');
  });

  const $addressField = $('#address');

  // FOCUS IN & OUT in EMPTY PHONE FIELD
  $addressField.focusout(() => {
    if (!$addressField.prop('value')) {
      $addressField.prop('placeholder', warning);
    }
  });
  $addressField.focusin(() => {
    $addressField.prop('placeholder', '');
  });

  // VALIDATE TEMPLATE ON SUBMISSION
  const $form = $('#user-info-form');
  const nameRegEx = /([a-zA-Z-]+)( )([a-zA-Z-]+)/g;
  const phoneRegEx = /[0-9-().# ]/g;
  const addressRegEx = /[a-zA-Z0-9-#. ]/g;
  const nameWarning = 'Please enter a valid name!';
  const phoneWarning = 'Please enter a valid phone number!';
  const addressWarning = 'Please enter a valid address!';

  $form.submit((event) => {
    event.preventDefault();

    if (!nameRegEx.test($nameField.val())) {
      $nameField.prop('value', '');
      $nameField.prop('placeholder', nameWarning);
      $nameField.focusin(() => {
        $nameField.prop('placeholder', '');
      });
    }
    if (!phoneRegEx.test($phoneField.val())) {
      $phoneField.prop('value', '');
      $phoneField.prop('placeholder', phoneWarning);
      $phoneField.focusin(() => {
        $phoneField.prop('placeholder', '');
      });
    }
    if (!addressRegEx.test($addressField.val())) {
      $addressField.prop('value', '');
      $addressField.prop('placeholder', addressWarning);
      $addressField.focusin(() => {
        $addressField.prop('placeholder', '');
      });
    }
  });
})();
