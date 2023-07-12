from django.urls import path
from . import views
from django.urls import path, include
from .views import *

urlpatterns = [
    path("getAllKanbanBoard/", getAllKanbanBoards.as_view(), name = "getAllKanbanBoard"),
    path("getKanbanBoardById/<str:kanban_board_id>/", getKanbanBoardById.as_view(), name = "getKanbanBoard"),
    path("createKanbanBoard/<str:input_user_id>/", createKanbanBoard.as_view(), name = 'createKanbanBoard')
]