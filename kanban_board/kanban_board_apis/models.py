# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Comment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    comment_body = models.CharField(max_length=50, blank=True, null=True)
    comment_timestamp = models.DateTimeField(blank=True, null=True)
    event = models.ForeignKey('Event', models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'comment'


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Event(models.Model):
    event_id = models.IntegerField(primary_key=True)
    event_name = models.CharField(max_length=20)
    event_type = models.CharField(max_length=10, blank=True, null=True)
    event_discription = models.CharField(max_length=50, blank=True, null=True)
    event_summary = models.CharField(max_length=100, blank=True, null=True)
    event_start_date = models.DateField(blank=True, null=True)
    event_end_date = models.DateField(blank=True, null=True)
    kanban_board = models.ForeignKey('KanbanBoard', models.DO_NOTHING, blank=True, null=True)
    reporter_user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    priority = models.ForeignKey('Priority', models.DO_NOTHING, blank=True, null=True)
    status = models.ForeignKey('Status', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'event'


class KanbanBoard(models.Model):
    kanban_board_id = models.IntegerField(primary_key=True)
    kanban_board_discription = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'kanban_board'


class Priority(models.Model):
    priority_id = models.IntegerField(primary_key=True)
    priority_name = models.CharField(max_length=10)
    priority_discription = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'priority'


class Status(models.Model):
    status_id = models.IntegerField(primary_key=True)
    status_name = models.CharField(max_length=20, blank=True, null=True)
    status_discription = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'status'


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    user_email = models.CharField(max_length=30, blank=True, null=True)
    user_password = models.CharField(max_length=50, blank=True, null=True)
    user_name = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
