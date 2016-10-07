#!usr/bin/env python
#! -*- coding: utf-8 -*-
"""
This module makes all work about login
"""


import hashlib
import string
import random


# this const used to make salt in hash
SALT_NAME = 'mrsalt'


def generate_salt(length=10):
    """
    This method generate salt for SHA512 encrypiton
    default length of salt is 10
    """
    return "".join(
        random.SystemRandom().choice(
            string.ascii_uppercase + string.digits) for _ in range(length))


def hash_password(password, salt=None):
    """
    Hash given password with sha512 and salt
    """
    sha512 = hashlib.sha512()
    if not salt:
        salt = generate_salt()
    sha512.update("".join([
        salt,
        SALT_NAME,
        password     
    ]))
    return "".join([salt, SALT_NAME, sha512.hexdigest()])


def check_password(password_to_check, hashed_password):
    """
    This method check if given password is same as hashed password
    """
    # getting salt from hashed password
    salt = hashed_password.split(SALT_NAME)[0]
    return hash_password(password_to_check, salt) == hashed_password


# test hash
if "__main__" == __name__:
    pass1 = 'TEST_PASS1'
    pass2 = 'TEST_PASS2'
    pass3 = 'TEST_PASS1'

    hashed_pass1 = hash_password(pass1)
    print pass1, 'equal to ', pass2, ' :: ', check_password(pass2, hashed_pass1)
    print pass1, 'equal to ', pass3, ' :: ', check_password(pass3, hashed_pass1)