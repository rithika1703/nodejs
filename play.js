const student = {
    name: 'Max',
    age: 18,
    greet: function() {
        console.log('Hi, I am ' + this.name);
    }
};

student.greet();
