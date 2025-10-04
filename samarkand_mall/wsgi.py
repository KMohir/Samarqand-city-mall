"""
WSGI config for samarkand_mall project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'samarkand_mall.settings')

application = get_wsgi_application()

