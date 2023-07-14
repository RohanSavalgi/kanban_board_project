from django.urls import path
from . import views
from django.urls import path, include
from .views import *

urlpatterns = [
    # Kanban Board Paths
    path("getAllKanbanBoard/", getAllKanbanBoards.as_view(), name = "getAllKanbanBoard"),
    path("getKanbanBoardById/<str:kanban_board_id>/", getKanbanBoardById.as_view(), name = "getKanbanBoard"),
    path("createKanbanBoard/<str:input_user_id>/", createKanbanBoard.as_view(), name = 'createKanbanBoard'),
    path("deleteKanbanBoard/<str:input_kanban_board_id>/", deleteKanbanBoard.as_view(), name = 'deleteKanbanBoard'),
    path("updateKanbanBoard/<str:input_kanban_board_id>/", updateKanbanBoard.as_view(), name = 'updateKanbanBoard'),
    path("getKanbanBoardByUserId/<str:input_user_id>/", getKanbanBoardByUserId.as_view(), name = "getKanbanBoardByUserId"),
    
    # Event Paths
    path("getAllEvents/", getAllEvents.as_view(), name = "getAllEvents"),
    path("getEventsByKanbanBoardId/<str:input_kanban_board_id>/", getEventByKanbanBoardId.as_view(), name = "getEventsByKanbanBoardId"),
    path("createEvent/", createEvent.as_view(), name = "createEvent"),
    path("updateEvent/<str:input_event_id>/", updateEvent.as_view(), name = "updateEvent"),
    path("deleteEvent/<str:input_event_id>/", deleteEvent.as_view(), name = "deleteEvent"),
    path("getEventsByPriority/<str:input_priority_id>/", getEventsByPriority.as_view(), name="getEventsByPriority"),
    
    # Comments Paths
    path("getCommentsByEventId/<str:input_event_id>/", getCommentsByEventId.as_view(), name = "getCommentsByEventId"),
    path("createComment/", createComment.as_view(), name = "createComment"),
    path("updateComment/<str:input_comment_id>/", updateComment.as_view(), name = "updateComment"),
    path("deleteComment/<str:input_comment_id>/", deleteComment.as_view(), name = "deleteComment"),
]