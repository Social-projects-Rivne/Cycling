# -*- coding: utf-8 -*-
"""
This module provide logging shortcuts
to make logging of similar things easier
"""
import logging


def log_request(request, logger=logging.getLogger(__name__)):
    """Django request logging shortcut.

    This method allow to log django request method type.
    Also method body and params.

    Arguments:
    request - target request object
    logger - target logger instance (default logging.getLogger(__name__))

    Author: Olexii
    """
    logger.debug("method: %s", request.method)
    logger.debug("body: %s", request.body)
    if request.method == "POST":
        di = request.POST
    elif request.method == "GET":
        di = request.GET
    logger.debug("params: %s", di)
