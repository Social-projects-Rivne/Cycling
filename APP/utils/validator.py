"""Module, that includes validation class, that
everybody must use or write when he need validation
"""

import re


class Validator(object):
    """Class, that include methods that validate different
    inputs, like name, email and others.
    """


    def full_name_validation(self, full_name_value):
        """Validate if full name starts with capital case, no numbers, only '-'."""
        return re.match(r'^[A-Z][A-z-\']+[A-z]\s[A-Z][A-z-\']+[a-z]$', full_name_value)


    def email_validation(self, email_value):
        """Validate if email value from has 1 @, . words after that and '.com'."""
        return re.match(r'^[A-z\d\._-]+@[A-z\d_-]+\.[a-z]+[\.a-z]*[a-z]$', email_value)

    def password_validation(self, password):
        """Validate if password value include at least
		8 characters and optional: letters, numbers, '.' and '_'
		"""
        return re.match(r'^[A-z\d\._]{8,}$', password)
