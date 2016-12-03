# -*- coding: utf-8 -*-
"""Module, that includes validation class, that
everybody must use or write when he need validation
"""
import re


class Validator(object):
    """Class, that include methods that validate different
    inputs, like name, email and others.
    """

    def full_name_validation(self, full_name_value):
        """Server full name field validation.

        Return if given field is valid.
        Validation rules:
        -starts with capital case
        -no numbers
        -alowed '-' only

        Argument:
        full_name_value - full name need to check

        Author: Dennys
        """
        return re.match(
            r'^[A-Z][A-z-\']+[A-z]\s[A-Z][A-z-\']+[a-z]$',
            full_name_value)

    def email_validation(self, email_value):
        """Server email field validation.

        Return if given field is valid.
        Validation rules:
        - have only one @
        - have word after @
        - have domain

        Author: Dennys
        """
        return re.match(
            r'^[A-z\d\._-]+@[A-z\d_-]+\.[a-z]+[\.a-z]*[a-z]$',
            email_value)

    def password_validation(self, password):
        """Server password field validation.

        Return if given field is valid.
        Validation rules:
        - length at least 8 characters
        - can contain letters, numbers, '.' and '_'

        Author: Dennys
        """
