class Validator {

    constructor(){}
    
    validateName(full_name) {    
      return /^[A-Z][A-z-']+[A-z]\s[A-Z][A-z-']+[a-z]$/.test(full_name);
    }

    validateEmail(email){
      return /^[A-z\d_-]+@[A-z\d_-]+\.[a-z]+[\.a-z]*[a-z]$/.test(email);
    }

    // requirements to password:
    //  - length more that 8
    validatePassword(password){
      if(password === undefined){
        return false
      }
      return /^[A-z\d\._]{8,}$/.test(password);
    };

    decimal(number){
      return /^\d+\.?\d+$/.test(number);
    };

    integer(number){
      return /^\d{1,2}$/.test(number);
    };
}

export { Validator };
