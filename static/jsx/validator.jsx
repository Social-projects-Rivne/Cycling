

class Validator {
    /*
     * Class for validation of inputs.
     * Use regexp, validate full name, email, password
     */


    validateName(full_name){
      return /^[A-Z][A-z-']+[A-z]\s[A-Z][A-z-']+[a-z]$/.test(full_name);
    }

    validateEmail(email){
      return /^[A-z\d\._-]+@[A-z\d_-]+\.[a-z]+[\.a-z]*[a-z]$/.test(email);
    }

    validatePassword(password){
      /*
       * requirements to password:
       * - length more that 8
       * - can contain numbers, characters and . _
       */

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
