//Utility Logic
function blankAddresses() {
  for (let i=0; i < arguments.length; i++) {
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false;
}

// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = {};
}

Contact.prototype.addAddresses = function(emailAddress, workAddress, homeAddress){
  this.emailAddress = emailAddress;
  this.homeAddress = homeAddress;
  this.workAddress = workAddress; 
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// Business Logic for Addresses
function Address(type, address) {
  this.type = type;
  this.address = address;
}

//UI Logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.fullName() + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".work-address").html(contact.workAddress);
  $(".home-address").html(contact.homeAddress);

  if (blankAddresses(contact.homeAddress)){
    $("#homeShow").hide()
  }else{
    $("#homeShow").show()
  }
  if (blankAddresses(contact.workAddress)){
    $("#workShow").hide()
  }else{
    $("#workShow").show()
  }
  if (blankAddresses(contact.emailAddress)){
    $("#emailShow").hide()
  }else{
    $("#emailShow").show()
  }

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    const inputtedHomeAddress = $("input#new-home-address").val();
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    newContact.addAddresses(inputtedEmailAddress, inputtedWorkAddress, inputtedHomeAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});


// multiple fields for address line 1, address line 2, city, state, zip
// concat into two lines.
// selector box for type of addresses. 
// pass the value into business logic to modify value of .type key 