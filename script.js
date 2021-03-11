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


// ******************** GLOBAL VARIABLES *******************//
var userDesiredPWLength;
var lowercaseArray = "qwertyuiopasdfghjklzxcvbnm".split("");
var uppercaseArray = [];
var numericArray = [1,2,3,4,5,6,7,8,9,0];
var specialcharArray = "\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~".split("");
var userDesiredCharArray = [];
var generatedPasswordArray = [];

// Set uppercaseArray to be an upper case version of lowercaseArray
for (var i = 0; i < lowercaseArray.length; i++) {
  uppercaseArray[i] = lowercaseArray[i].toUpperCase();
}

// "Generate Password" HTML Button (Button CSS id == #generate, Button CSS class == .btn)
// "Copy to ClipBoard" HTML Button (Button CSS id == #copytoClipboard, CSS class == .btn)
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copytoClipboard");


// ******************** BEGIN MAIN CODE ********************** //
// Calls generatePassword() when button is clicked on HTML
// Calls copyToClipboard() when button is clicked on HTML
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyToClipboard);

// ******************** FUNCTION DECLARATIONS **************//

// ************* copyToClipboard () ************************//
// Gets the text in the text area, copies it, and alerts the user
function copyToClipboard() {
  /* Get the text field */
  var copyText = document.getElementById("password");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}

// ************* generatePassword () ************************//
// Generate the user's new strong password
function generatePassword() {

  // Prompt user to enter desired password length (8 - 128)
  var message = "Enter your desired password length (between 8 - 128 characters): ";
  var defaultText = 12;

  // Store result in userDesiredPWLength
  userDesiredPWLength = window.prompt(message, defaultText);

  // Convert string user entered into a Number
  userDesiredPWLength = parseInt(userDesiredPWLength);

  // If user entered random things and userDesiredPWLength is not a number, alert user to try again
  // Else if it's a number but not a valid one between 8 - 128, alert user to try again
  if (isNaN(userDesiredPWLength)) {
    alert("Uh oh, Your password length needs to be A NUMBER between 8 and 128 characters, please try again.");
    return;
  } else if ((userDesiredPWLength < 8) || (userDesiredPWLength > 128)) {
    alert("Uh oh, Your password length needs to be a number between 8 and 128 characters, please try again.");
    return;
  }

  // Else proceed with character set prompts:

  // Prompt user and add special character array items to userDesiredCharArray if the user desires
  var answer = confirm("Click OK if you would like to include special characters in your password:");
  if (answer) {
    userDesiredCharArray = specialcharArray;
  }
  
  // Prompt user and add numeric character array items to end of userDesiredCharArray if user desires
  answer = confirm("Click OK if you would like to include numerical characters in your password:");
  if (answer) {
    userDesiredCharArray = userDesiredCharArray.concat(numericArray);
  }

  // Prompt user and add lowercase character array items to end of userDesiredCharArray if user desires
  answer = confirm("Click OK if you would like to include lowercase characters in your password:");
  if (answer) {
    userDesiredCharArray = userDesiredCharArray.concat(lowercaseArray);
  }

  // Prompt user and add uppercase character array items to end of userDesiredCharArray if user desires
  answer = confirm("Click OK if you would like to include uppercase characters in your password:");
  if (answer) {
    userDesiredCharArray = userDesiredCharArray.concat(uppercaseArray);
  }

  // What if our user didn't OK *ANY* character sets? Confirm that user needs to choose at least one and try again
  if (userDesiredCharArray.length == 0) {
    confirm("I'm sorry, you need to choose at least SOME characters to make a password. Please try again.");
    return;
  }

  // Now we have the information we need to randomly generate the password based on user's desires
  // Until we reach the desired password length, randomly select a character from the user's desired character set  
  for (var i = 0; i < userDesiredPWLength; i++)
  {
    generatedPasswordArray[i] = userDesiredCharArray[Math.floor(Math.random() * userDesiredCharArray.length-1)];
  }

  // Turn our array of characters into a string with no delimiters and store it in our new password variable
  var newPassword = generatedPasswordArray.join("");

  // Find the #password element on the HTML document and set the value to be the newly generated password
  var passwordTextForBrowser = document.querySelector("#password");
  passwordTextForBrowser.value = newPassword;
  
  // Reset variables if user wants to try again without reloading page
  generatedPasswordArray.length = 0;
  userDesiredCharArray.length = 0;
  userDesiredPWLength = 0;
  
  return;
} 
// ****************** END FUNCTION DECLARATIONS *****************//

