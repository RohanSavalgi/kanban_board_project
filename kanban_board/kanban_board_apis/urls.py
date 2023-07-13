from django.urls import path
from . import views
from django.urls import path, include
from .views import *

urlpatterns = [
    # Kanban Board Paths
    path("getAllKanbanBoard/", getAllKanbanBoards.as_view(), name = "getAllKanbanBoard"),
    path("getKanbanBoardById/<str:kanban_board_id>/", getKanbanBoardById.as_view(), name = "getKanbanBoard"),
    path("createKanbanBoard/<str:input_user_id>/", kanbanBoardApis.as_view(), name = 'createKanbanBoard'),
    path("deleteKanbanBoard/<str:input_kanban_board_id>/", kanbanBoardApis.as_view(), name = 'deleteKanbanBoard'),
    path("updateKanbanBoard/<str:input_kanban_board_id>/", kanbanBoardApis.as_view(), name = 'updateKanbanBoard'),
    
    # Event Paths
    path("getAllEvents/", eventsApis.as_view(), name = "getAllEvents"),
    path("getEventsByKanbanBoardId/<str:input_kanban_board_id>/", eventsApis.as_view(), name = "getEventsByKanbanBoardId"),
    path("createEvent/", eventsApis.as_view(), name = "createEvent"),
    path("updateEvent/<str:input_event_id>/", eventsApis.as_view(), name = "updateEvent"),
    path("deleteEvent/<str:input_event_id>/", eventsApis.as_view(), name = "deleteEvent"),
    
    # Comments Paths
    path("getCommentsByEventId/<str:input_event_id>/", commentsApi.as_view(), name = "getCommentsByEventId"),
    path("createComment/", commentsApi.as_view(), name = "createComment"),
    path("updateComment/<str:input_comment_id>/", commentsApi.as_view(), name = "updateComment"),
    path("deleteComment/<str:input_comment_id>/", commentsApi.as_view(), name = "deleteComment"),
]