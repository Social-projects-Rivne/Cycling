class Validator {

    constructor(){};

    validateEmail(email){
      return /[A-Za-z0-9\.\+_-]+\@[A-Za-z0-9\._-]+\.[a-zA-Z]*$/.test(email);
    };

    // requirements to password:
    //  - length more that 8
    //  - contains uppercase
    //  - contains lowercase
    //  - contains number
    validatePassword(password){
      if (password === undefined)
        return false;
      // 1
      if (password.length < 8)
        return false;
      // regexp for 2
      let uppercase_regex = /.*[A-Z].*/;
      // regexp for 3
      let lowercase_regex = /.*[a-z].*/;
      // regexp for 4
      let number_regex = /.*[0-9].*/;

      return uppercase_regex.test(password) &&
        lowercase_regex.test(password) &&
        number_regex.test(password);
    };

    decimal(number){
      return /^\d+\.?\d+$/.test(number);
    };

    integer(number){
      return /^\d+$/.test(number);
    };
}

export { Validator };
