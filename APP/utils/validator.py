# -*- coding: utf-8 -*-
"""This module provide validator class"""
import re


class Validator(object):

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
        return re.match(r'^[A-z\d\._]{8,}$', password)
