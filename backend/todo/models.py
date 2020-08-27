# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Todo(models.Model):
      name = models.CharField(max_length=120)
      shop_name = models.CharField(max_length=120)
      status = models.TextField()
      date_val = models.DateTimeField()

      def _str_(self):
        return self.name