const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
} else if (process.argv.length === 4) {
    console.log('name or number missing');
    process.exit(1);
};

const password = encodeURIComponent(process.argv[2]);
const personName = process.argv[3];
const personNumber = process.argv[4];

const url =
    `mongodb+srv://fullstack:${password}@fso-part3-cluster.osorm2s.mongodb.net/personApp?retryWrites=true&w=majority&appName=fso-part3-cluster`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:');

        result.forEach(person => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else {
    const person = new Person({
        name: personName,
        number: personNumber,
    });

    person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`);
        mongoose.connection.close();
    });
};
