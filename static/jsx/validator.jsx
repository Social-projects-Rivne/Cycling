

class Validator {
    /*
     * Class for validation of inputs.
     * Use regexp, validate full name, email, password
     */


    validateName(full_name){
      /*
       * Regexp that validate if every word of full name begins from uppercase
       * letter, and can consist only from letters, dash between words,
       * and "'" symbol
       */

      return /^[A-Z][a-z-']+[A-z]\s[A-Z][a-z-']+[a-z]$/.test(full_name);
    }

    validateEmail(email){
      /*
       * Regexp that validate if email has right form - standart email form.
       * For example -  JohnDoe@email.com
       */

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
