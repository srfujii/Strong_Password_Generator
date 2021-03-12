// Susan Fujii Strong Password Generator JavaScript Code
// **********************************************************
// SERIES OF PROMPTS:
//    1. Prompt user first for password length (8 - 128) and store results
//          - Validate that user entered in an actual Number
//          - If it is a number, validate whether it is between 8 - 128 characters
//    If user's desired password length is valid, then:
//
//    2. Individually prompt for each character set to include one at a time:
//
//              a. Would you like to include special characters in your password?
//              b. Would you like to include numeric letters in your password?
//              c. Would you like to include lowercase letters in your password?
//              d. Would you like to include uppercase letters in your password?
//
//    3. As user selects his/her desired character sets
//  
//              a. Add them to the array of user desired character sets
//              b. Prompt user about the next character set
//    4. If user selects NO character sets to include
//
//              a. Alert user that at least ONE character set must be chosen
//              b. Return user to document to try again
//
//    5. Once we have desired password length and character sets, for each position
//       in our new password, choose a random character from the set of approved/desired
//       character sets
//
//    6. Display password to user (alert and in document)
//
//    7. Allow user to copy the new password to the clipboard
//       
// **********************************************************


// ****************** GLOBAL VARIABLES *******************//
var generateBtn = document.querySelector("#generate");        // "Generate Password" HTML Button
var copyBtn = document.querySelector("#copytoClipboard");     // "Copy to ClipBoard" HTML Button


// ******************** EVENT LISTENERS ******************//
generateBtn.addEventListener("click", generatePassword);      // Calls generatePassword() when button is clicked on HTML
copyBtn.addEventListener("click", copyToClipboard);           // Calls copyToClipboard() when button is clicked on HTML


// ************* FUNCTION: copyToClipboard () ************//
// Retrieves the text in the text area, copies it, and alerts the user
function copyToClipboard() {
  var copyText = document.getElementById("password");         // Get the text field
  copyText.select();                                          // Select the text field
  copyText.setSelectionRange(0, 99999);                       // For mobile devices
  document.execCommand("copy");                               // Copy the text inside the text field
  alert("Copied the text: " + copyText.value);                // Alert user text has been copied
}

// ************* FUNCTION: generatePassword() ************//
// Generate the user's new strong password
function generatePassword() {
  var message = "";                                             // Message to prompt user
  var defaultText = "";                                         // Default (suggested) text in input box
  var userDesiredPWLength = 0;                                  // Length of password user wants
  var lowercaseArray = "qwertyuiopasdfghjklzxcvbnm".split("");  // Array of lowercase letters
  var uppercaseArray = [];                                      // Array of uppercase letters (set below)
  var numericArray = "1234567890".split("");                    // Array of numbers
  var specialcharArray = "\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~".split("");  // Array of special characters (must \ in front of each one)
  var userDesiredCharArray = [];                                // Array to hold only character sets that user wants
  var generatedPasswordArray = [];                              // Array to hold final generated password
  var newPassword = "";                                         // String to hold the new password
  var passwordHTML = "";                                        // String to hold the HTML ID of the password

  // Set uppercaseArray to be an upper case version of lowercaseArray
  for (var i = 0; i < lowercaseArray.length; i++) {
    uppercaseArray[i] = lowercaseArray[i].toUpperCase();
  }

  // ************* INTERNAL FUNCTION: concatToArray() *******//
  // Concatenates the incoming character set to the user's list of desired character sets IF the user desires
  function concatToArray (promptMessage, arrayToAdd) {
    var answer = confirm(promptMessage);
    if (answer) {
      userDesiredCharArray = userDesiredCharArray.concat(arrayToAdd);
    }
    return;
  }

  // Prompt user for desired password length (8 - 128) and save result
  message = "Enter your desired password length (between 8 - 128 characters): ";
  defaultText = 12;
  userDesiredPWLength = window.prompt(message, defaultText);  // Save user input
  userDesiredPWLength = parseInt(userDesiredPWLength);        // Convert user input into a Number

  // Check for valid input, else return and have user try again
  if (isNaN(userDesiredPWLength)) {                           // If user input is not a number then alert and return
    alert("Uh oh, Your password length needs to be A NUMBER between 8 and 128 characters, please try again.");
    return;
  } else if ((userDesiredPWLength < 8) || (userDesiredPWLength > 128)) {    // Else if user number is out of bounds alert and return
    alert("Uh oh, Your password length needs to be a number between 8 and 128 characters, please try again.");
    return;
  } else {                                                    // Else proceed with character set prompts:
    concatToArray("Click OK if you would like to include special characters in your password:", specialcharArray);
    concatToArray("Click OK if you would like to include numerical characters in your password:", numericArray);
    concatToArray("Click OK if you would like to include lowercase characters in your password:", lowercaseArray);
    concatToArray("Click OK if you would like to include uppercase characters in your password:", uppercaseArray);
  }

  // Now we have the information we need to randomly generate the password based on user's choices
  if (userDesiredCharArray.length !== 0) {                // Make sure the user chose at least ONE character set to proceed...
    
    // Randomly select a character from the user's desired character set until we reach the desired password length 
    for (var i = 0; i < userDesiredPWLength; i++) {
      generatedPasswordArray[i] = userDesiredCharArray[Math.floor(Math.random() * (userDesiredCharArray.length-1))];
    }   // End for loop

    newPassword = generatedPasswordArray.join("");        // Turn our randomly generated array of characters into a string
    passwordHTML = document.querySelector("#password");   // Find the #password element on the HTML document
    passwordHTML.value = newPassword;                     // Set the value to be the newly generated password
    return;

  } else {          // What if our user didn't OK *ANY* character sets? Confirm that user needs to choose at least one and try again
      confirm("I'm sorry, you need to choose at least SOME characters to make a password. Please try again.");
    return;
  }
} 
// ****************** END FUNCTION: generatePassword() *****************//
