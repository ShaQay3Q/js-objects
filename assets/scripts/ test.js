const person = {
	name: "Parvaneh",
	age: 40,
	hobbies: ["Reading", "Writting", "Indian Movies"],
	hello: function () {
		alert("Hi there!");
	},
};

// ADD a property or Re-write a property
person.isAdmin = true;

// DELETE a property
// delete person.age;
// person.age = undefined => //! never do this as a developer!
person.age = null;

// person.hello()
console.log(person);
