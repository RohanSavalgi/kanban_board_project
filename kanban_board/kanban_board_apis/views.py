import json
from django.http import JsonResponse
from rest_framework import status
from django.views import View  

from .serializers import *
from .models import *

# Create your views here.

# API to get all kanban boards
# Sample API call -http://127.0.0.1:8000/kanbanBoards/getAllKanbanBoard/
class getAllKanbanBoards(View):
    def get(self, request):
        allKanbanBoards = KanbanBoard.objects.all()
        serializedBoards = KanbanBoardSerializer(allKanbanBoards, many = True)
        return JsonResponse(serializedBoards.data, status = status.HTTP_200_OK, safe = False)
   
   
#API to get a single kanban board based on the id given
# Sample API call - http://127.0.0.1:8000/kanbanBoards/getKanbanBoardById/1/
class getKanbanBoardById(View): 
    def get(self, request, kanban_board_id):
        oneKanbanBoard = KanbanBoard.objects.filter(kanban_board_id = kanban_board_id)
        serializedBoard = KanbanBoardSerializer(oneKanbanBoard, many = True)
        return JsonResponse(serializedBoard.data, status = status.HTTP_200_OK, safe = False)
    
# API to create a kanban board, it also checks if the user is present
class kanbanBoardApis(View):
    def post(self, request, input_user_id):
        # check all the inputs are correct or not
        # jsonDataAgain = json.loads(request.body)
        # print(jsonDataAgain['user'])
        creatingUser = Users.objects.filter(user_id = input_user_id)
        ser = UserSerializer(data = creatingUser)
        print(ser.is_valid())
        
        if creatingUser:
            jsonData = json.loads(request.body)
            serializedBoardData = KanbanBoardSerializer(data=jsonData)
            if serializedBoardData.is_valid():
                serializedBoardData.save()
                return JsonResponse(serializedBoardData.data, status = status.HTTP_200_OK, safe = False)
            else:
                return JsonResponse("No user exists with this ID.", status = status.HTTP_500_INTERNAL_SERVER_ERROR, safe = False)
        else:
            return JsonResponse("Hit here", status = status.HTTP_400_BAD_REQUEST, safe = False)
            
    def delete(self, request, input_kanban_board_id):
        toBeDeletedBoard = KanbanBoard.objects.get(kanban_board_id = input_kanban_board_id)
        toBeDeletedBoard.delete()
        return JsonResponse("Deleted",status = status.HTTP_200_OK, safe = False)
        
    def put(self, request, input_kanban_board_id, format=None):
        transformedData = json.loads(request.body)
        transformer = KanbanBoard.objects.get(kanban_board_id = input_kanban_board_id)
        serializer = KanbanBoardSerializer(transformer, data = transformedData)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe = False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe = False)
           
class eventsApis(View):
    def get(self, request):
        allEventsList = Event.objects.all()
        serializedEvents = EventSerializer(allEventsList, many = True)
        return JsonResponse(serializedEvents.data, status = status.HTTP_200_OK, safe = False)
    
    def get(self, request, input_kanban_board_id):
        eventsFromPerticularKanbanBoard = Event.objects.filter(kanban_board_id = input_kanban_board_id)
        serializersEvents = EventSerializer(eventsFromPerticularKanbanBoard, many = True)
        return JsonResponse(serializersEvents.data, status = status.HTTP_200_OK, safe = False)
    
    def post(self, request):
        jsonConverted = json.loads(request.body)
        serializedEvent = EventSerializer(data = jsonConverted)
        if serializedEvent.is_valid():
            serializedEvent.save()
            return JsonResponse(serializedEvent.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedEvent.errors, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
    def put(self, request,input_event_id):
        jsonConverted = json.loads(request.body)
        searchedEvent = Event.objects.get(event_id = input_event_id)
        serializedEvent = EventSerializer(searchedEvent, data = jsonConverted)
        if serializedEvent.is_valid():
            serializedEvent.save()
            return JsonResponse(serializedEvent.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedEvent.errors, status = status.HTTP_400_BAD_REQUEST ,safe = False)
    
    def delete(self, request, input_event_id):
        toBeDeletedEvent = Event.objects.get(event_id = input_event_id)
        toBeDeletedEvent.delete()
        return JsonResponse("Deleted!", status = status.HTTP_200_OK, safe = False)
    
class commentsApi(View):
    def get(self, request, input_event_id):
        commentsForPerticularEvent = Comment.objects.filter(event = input_event_id)
        serializersComments = CommentSerializer(commentsForPerticularEvent, many = True)
        return JsonResponse(serializersComments.data, status = status.HTTP_200_OK, safe = False)
    
    def post(self, request):
        requestConvertedToJson = json.loads(request.body)
        serializedComment = CommentSerializer(data = requestConvertedToJson)
        if serializedComment.is_valid():
            serializedComment.save()
            return JsonResponse(serializedComment.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedComment.errors, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
    def put(self, request,input_comment_id):
        requestConvertedToJson = json.loads(request.body)
        searchedComment = Comment.objects.get(comment_id = input_comment_id)
        serializedComment = CommentSerializer(searchedComment, data = requestConvertedToJson)
        if serializedComment.is_valid():
            serializedComment.save()
            return JsonResponse(serializedComment.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedComment.errors, status = status.HTTP_400_BAD_REQUEST ,safe = False)
    
    def delete(self, request, input_comment_id):
        toBeDeletedComment = Comment.objects.get(comment_id = input_comment_id)
        toBeDeletedComment.delete()
        return JsonResponse("Deleted!", status = status.HTTP_200_OK, safe = False)
        
            

