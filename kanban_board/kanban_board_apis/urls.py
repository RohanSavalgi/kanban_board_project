from django.urls import path
from . import views
from django.urls import path, include
from .views import *

urlpatterns = [
    # Kanban Board Paths
    # path("board", getAllKanbanBoards.as_view(), name = "getAllKanbanBoard"),
    path("board/<str:kanban_board_id>/", getKanbanBoardById.as_view(), name = "getKanbanBoard"),
    path("board/<str:input_user_id>/", createKanbanBoard.as_view(), name = 'createKanbanBoard'),
    path("board/<str:input_kanban_board_id>/", deleteKanbanBoard.as_view(), name = 'deleteKanbanBoard'),
    path("board/<str:input_kanban_board_id>/", updateKanbanBoard.as_view(), name = 'updateKanbanBoard'),
    
    # GET KANBAN BY USER ID
    path("board/user/<str:input_user_id>/", getKanbanBoardByUserId.as_view(), name = "getKanbanBoardByUserId"),
    
    # Event Paths
    # CREATE EVENT
    path("event/", EventData.as_view(), name = "createEvent"),
    
    # GET EVENT BY ID
    path("event/<str:input_kanban_id>/", EventData.as_view(), name="getEventsByPriority"),
    
    # UPDATE EVENT 
    path("events/<str:input_event_id>/", EventById.as_view(), name = "updateEvent"),
    
    # DELETE EVENT
    path("events/<str:input_event_id>/", EventById.as_view(), name = "deleteEvent"),
    
    # GET EVENT BY STATUS ID
    path("events/<str:input_event_id>/", EventById.as_view(), name="getEventById"),
    
    
    # Status Paths
    path("status/", getAllStatus.as_view(), name="getAllStatus"),
    
    # Priority Paths
    path("priority/", getAllPriority.as_view(), name="getAllStatus"),
    
    # Users Path
    path("user/<str:input_user_id>/", getUserById.as_view(), name="getUserById"), 
    
    # Auth Path
    path("login/", login.as_view(), name="login function"),
    
    path("register/", register.as_view(), name="registerANewUser"),
    
    # Comments Paths
    path("getCommentsByEventId/<str:input_event_id>/", getCommentsByEventId.as_view(), name = "getCommentsByEventId"),
    path("createComment/", createComment.as_view(), name = "createComment"),
    path("updateComment/<str:input_comment_id>/", updateComment.as_view(), name = "updateComment"),
    path("deleteComment/<str:input_comment_id>/", deleteComment.as_view(), name = "deleteComment"),
]