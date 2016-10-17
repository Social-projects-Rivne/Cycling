import re


class Validator(object):

	def full_name_validation(self, full_name_value):
		"""...Validate if full name starts with capital case, no numbers, only -"""
		if re.match(r'^[A-Za-z\s_-]+$', full_name_value):
			return True
		else: 
			return False

				
	def email_validation(self, email_value):
		"""Validate if email value from has 1 @, . words after that and .com"""
		if re.match(r'^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$', email_value):
			return True
		else: 
			return False
