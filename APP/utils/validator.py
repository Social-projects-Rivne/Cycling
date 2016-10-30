import re


class Validator(object):

	def full_name_validation(self, full_name_value):
		"""Validate if full name starts with capital case, no numbers, only -"""
		if re.match(r'^[A-Z][A-z-\']+[A-z]\s[A-Z][A-z-\']+[a-z]$', full_name_value):
			return True
		else: 
			return False

				
	def email_validation(self, email_value):
		"""Validate if email value from has 1 @, . words after that and .com"""
		if re.match(r'^[A-z\d_-]+@[A-z\d_-]+\.[a-z]+[\.a-z]*[a-z]$', email_value):
			return True
		else: 
			return False
