from django.urls import path
from . import views
from django.urls import path, include
from .views import *

urlpatterns = [
    # KANBAN BOARD PATHS
    # CREATE A NEW KANBAN BOARD
    path("board/<str:input_user_id>/", createKanbanBoard.as_view(), name = 'createKanbanBoard'),
    
    # GET KANBAN BY USER ID
    path("board/user/<str:input_user_id>/", getKanbanBoardByUserId.as_view(), name = "getKanbanBoardByUserId"),
    
    # EVENT PATHS
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
    
    
    # STATUS PATHS
    #  GET ALL STATUS
    path("status/", getAllStatus.as_view(), name="getAllStatus"),
    
    # PRIORITY PATHS
    # GET ALL PRIORITIES
    path("priority/", getAllPriority.as_view(), name="getAllStatus"),
    
    # USER PATHS
    # GET USER INFO BY USER ID
    path("user/<str:input_user_id>/", getUserById.as_view(), name="getUserById"), 
    
    # AUTH PATHS
    # LOGIN 
    path("login/", login.as_view(), name="login function"),
    
    # REGISTER
    path("register/", register.as_view(), name="registerANewUser"),
    
    # COMMENTS PATHS
    # GET ALL COMMENTS BASED ON EVENT ID
    path("comment/<str:input_event_id>/", getCommentsByEventId.as_view(), name = "getCommentsByEventId"),
    
    # CREATE A NEW COMMENT
    path("comment/", createComment.as_view(), name = "createComment"),
]