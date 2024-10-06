//--------------ADD Elements Function----------------
//1. Create List of Tip Buttons
function tipSelctor() {
  const tipButton = document.getElementById("buttons");
  const tipValues = [5, 10, 15, 25, 50];

  // 1.1 Create "div" containers for each value in "tipValues"
  tipValues.forEach(tipValue => {
    const divButton = document.createElement("div");
    divButton.classList.add("tipButton"); // Add the class ".tipButton" to each "tipValue"
    divButton.textContent = `${tipValue}%`;
    divButton.onclick = () => selectTip(divButton, tipValue); // Call "selectTip" function with the selected tip value
    tipButton.appendChild(divButton); // Append the button to the parent "#buttons"
  });
}

//2. Get the selected tip value and display it in the <div> from the selection box.
function selectTip(divButton, tipValue) {
  const selectedPercentElement = document.getElementById("selectedPercent");

  // Check if the button is already selected
  if (divButton.classList.contains("selectedTip")) {
    // If selected, deselect it
    divButton.classList.remove("selectedTip");
    selectedPercentElement.textContent = "Tips to leave: 0%"; // Reset the percentage to 0%
  } else {
    // Deselect other selected buttons
    const buttons = document.querySelectorAll(".tipButton");
    buttons.forEach(button => button.classList.remove("selectedTip"));

    // Select the new button
    divButton.classList.add("selectedTip");
    selectedPercentElement.textContent = `Tips to leave: ${tipValue}%`; // Update the selected percentage
  }
}

//3. Call the function to create the buttons when the page loads
document.addEventListener("DOMContentLoaded", tipSelctor);

//---NUMBER OF PEOPLE CONTAINER---
//1. Add "option" attribute to the HTML for "Number of People"
function listOfPeople() {
  const selectElement = document.getElementById("peopleSelector");
  
  //1.1 Create "options" from 1 to 10
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option); // Append the options to the selector
  }
}
//2. Call the function to fill the selector when the page loads
document.addEventListener("DOMContentLoaded", listOfPeople);


//---------------CALCULATION TIP-------------------
// Function to calculate the tip
function calculateTip() {
  
  const amountInput = document.getElementById("amount");
  const amount = parseFloat(amountInput.value);

  // Check if the input is empty or invalid
  if (isNaN(amount) || amount <= 0) {
    // Border turns red if invalid input
    amountInput.style.border = "2px solid red";

    // Display error message
    document.getElementById("tipOnePerson").textContent = "No 🧾 amount ⚠";
    document.getElementById("totalOnePerson").textContent = "It's important 😊💰";
    return; // Stop function execution
  } else {

    // Reset border if the input is valid
    amountInput.style.border = "";

    // Get the selected tip percentage
    const selectedTipElement = document.getElementById("selectedPercent");
    const tipValue = parseFloat(selectedTipElement.textContent.match(/\d+/)); // Extract the number from the div (without the % symbol)

    // Get the selected number of people
    const numberOfPeople = parseInt(document.getElementById("peopleSelector").value);

    // Elements to display the results
    const tipOnePersonElement = document.getElementById("tipOnePerson");
    const totalOnePersonElement = document.getElementById("totalOnePerson");

    // Variables for calculation
    let tipAmount = 0;
    let totalAmount = 0;
    const currency = ['LEI', 'EUR', 'USD']; // Currency options
    // Check if a tip percentage is selected
    if (tipValue > 0) {
      // Calculate tipAmount and totalAmount
      tipAmount = (amount * (tipValue / 100)) / numberOfPeople;
      totalAmount = ((amount * (tipValue / 100)) + amount) / numberOfPeople;

      tipOnePersonElement.textContent = `${tipAmount.toFixed(2)} ${currency[0]}`; // Display the tip per person
      totalOnePersonElement.textContent = `${totalAmount.toFixed(2)} ${currency[0]}`; // Display the total amount per person
    } else {
      // Default case: only display the total amount and "No tip"
      totalAmount = amount / numberOfPeople;
      tipAmount = "Without Tip";

      tipOnePersonElement.textContent = tipAmount; // Display "Without Tip" message
      totalOnePersonElement.textContent = `${totalAmount.toFixed(2)} ${currency[0]}`; // Display the total amount per person
    }
  }
}

// Reset border when input is provided
function resetBorderOnInput() {
  const amountInput = document.getElementById("amount");

  if (amountInput.value !== '') {
    amountInput.style.border = ""; // Reset border color when valid input is entered
  }
}
// Attach the reset function to the 'input' event on the amount field
document.getElementById("amount").addEventListener("input", resetBorderOnInput);

// Attach the calculation function to the "Calculate" button
document.getElementById("calculate").addEventListener("click", calculateTip);


//---------------INPUT VALIDATION------------------------
// Function to prevent entering '+' and '-' symbols and to limit decimal places
function validateInput(event) {
  const input = event.target.value;

  // Prevent entering invalid characters like '+', '-', or letters
  const invalidChars = ['+', '-', 'e', 'E'];
  if (invalidChars.includes(event.key)) {
    event.preventDefault(); // Stop invalid key press
    return;
  }

  // Allow navigation keys (left/right arrows), Backspace, Delete, and Tab
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab') {
    return; // Allow these keys
  }

  // Check total digits (excluding the decimal point)
  const totalDigits = input.replace('.', '').length;

  // Limit to a maximum of 20 digits
  if (totalDigits >= 20 && event.key !== 'Backspace') {
    event.preventDefault(); // Prevent entering more characters
    return;
  }

  // Check if a decimal point exists
  if (input.includes('.')) {
    // Limit to two decimal places
    const decimalPart = input.split('.')[1];
    if (decimalPart.length >= 2 && event.key !== 'Backspace') {
      event.preventDefault(); // Prevent entering more decimal places
    }
  }
}
// Apply validation to the input field of type "number"
const amountInput = document.getElementById("amount");
amountInput.addEventListener("keydown", validateInput);



//---------------RESET FUNCTION--------------------
// Function to reset the calculator
function resetCalculator() {
  // Reset the bill amount field
  const amountInput = document.getElementById("amount");
  amountInput.value = ''; // Clear input value

  // Reset the input border style
  amountInput.style.border = ""; // Reset the border style

  // Reset the tip percentage selection
  const selectedPercentElement = document.getElementById("selectedPercent");
  selectedPercentElement.textContent = 'Tips to leave: 0%'; // Reset percentage to 0%

  // Reset the number of people selection
  document.getElementById("peopleSelector").selectedIndex = 0; // Reset to the first option

  // Reset the displayed results
  document.getElementById("tipOnePerson").textContent = '0 Σ'; // Reset the tip per person
  document.getElementById("totalOnePerson").textContent = '0 Σ'; // Reset the total per person

  // Reset the selected tip buttons
  const buttons = document.querySelectorAll(".tipButton");
  buttons.forEach(button => {
    button.classList.remove("selectedTip"); // Deselect all buttons
  });
}
// Attach the reset function to the "Reset" button
document.getElementById("reset").addEventListener("click", resetCalculator);
