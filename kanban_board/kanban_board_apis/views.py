import json
from django.http import JsonResponse
from rest_framework import status
from django.views import View  

from .serializers import *
from .models import *

# Global variables
all_error_dictionary = {
    "invalid_id_error" : JsonResponse(json.loads('{"error" : "User Id ID is not valid.Eigher its a invalid integer or a string."}'), status = status.HTTP_204_NO_CONTENT, safe = False),
    "not_found_element": JsonResponse(json.loads('{"error" : "No element was found with this ID"}'), status = status.HTTP_404_NOT_FOUND, safe = False),
    "request_data_invalid" : JsonResponse(json.loads('{"error" : "The request data which was entered is not valid."}'), status = status.HTTP_404_NOT_FOUND, safe = False),
    "could_not_update": JsonResponse(json.loads('{"error" : "We could not update the database."}'), status = status.HTTP_404_NOT_FOUND, safe = False),
}

# Create your views here.
def checkRequestData(request):
    for i in request.values():
        if type(i) == str:
            if i == "":
                return False 
        elif type(i) == int:
            if i <= 0:
                return False
    return True
        
def checkParameter(parameter):
    try:
        integerParameter = int(parameter)
        if(integerParameter <= 0):
            return False
        else:
            return True
    except:
        return False
# Global variables

# API to get all kanban boards
# Sample API call -http://127.0.0.1:8000/kanbanBoards/getAllKanbanBoard/
class getAllKanbanBoards(View):
    def get(self, request):
        allKanbanBoards = KanbanBoard.objects.all()
        serializedBoards = KanbanBoardSerializer(allKanbanBoards, many = True)
        return JsonResponse(serializedBoards.data, status = status.HTTP_200_OK, safe = False)

class getKanbanBoardByUserId(View):
    def get(self, request, input_user_id):
        # checking if the input user is is valid or not
        if not checkParameter(input_user_id):
            return all_error_dictionary['invalid_id_error'] 
        
        # Get logic
        allKanbanBoardsByUsedId = KanbanBoard.objects.filter(user_id = input_user_id)
        serializedBoards = KanbanBoardSerializer(allKanbanBoardsByUsedId, many = True)
        return JsonResponse(serializedBoards.data, status = status.HTTP_200_OK, safe = False)
   
#API to get a single kanban board based on the id given
# Sample API call - http://127.0.0.1:8000/kanbanBoards/getKanbanBoardById/1/
class getKanbanBoardById(View): 
    def get(self, request, kanban_board_id):
        # Checking the kanban board id is valid or not
        if not checkParameter(kanban_board_id):
            return all_error_dictionary['invalid_id_error']
        
        oneKanbanBoard = KanbanBoard.objects.filter(kanban_board_id = kanban_board_id)
        #checking if it exists or not
        if oneKanbanBoard.exists():
            # Get Logic
            serializedBoard = KanbanBoardSerializer(oneKanbanBoard, many = True)
            return JsonResponse(serializedBoard.data, status = status.HTTP_200_OK, safe = False)
        else:
            return all_error_dictionary['not_found_element']
    
# API to create a kanban board, it also checks if the user is present
class createKanbanBoard(View):
    def post(self, request, input_user_id):
        # Checking if the parameter is valid or not
        if not checkParameter(input_user_id):
            return all_error_dictionary['invalid_id_error']            
        
        # check all the inputs are correct or not
        # jsonDataOfRequest = json.loads(request.body)
        # if not checkRequestData(jsonDataOfRequest):
        #     return JsonResponse("The request data is not valid.", status = status.HTTP_400_BAD_REQUEST, safe = None)
        
        # ====================================================================> changes required 
        creatingUser = Users.objects.filter(user_id = input_user_id)
        print(creatingUser.exists())
        
        if creatingUser:
            jsonData = json.loads(request.body)
            serializedBoardData = KanbanBoardSerializer(data=jsonData)
            if serializedBoardData.is_valid():
                serializedBoardData.save()
                return JsonResponse(serializedBoardData.data, status = status.HTTP_200_OK, safe = False)
            else:
                return all_error_dictionary['invalid_id_error']
        else:
            return JsonResponse("Hit here", status = status.HTTP_400_BAD_REQUEST, safe = False)
            
class deleteKanbanBoard(View):
    def delete(self, request, input_kanban_board_id):
        #checking the input_kanban_board_id
        if not checkParameter(input_kanban_board_id):
            return all_error_dictionary['invalid_id_error']
        
        #checking if kanban board exists or not
        existingKanbanBoard = KanbanBoard.objects.filter(kanban_board_id = input_kanban_board_id)
        if not existingKanbanBoard.exists():
            return all_error_dictionary['not_found_element']
        
        # Deletion Logic
        toBeDeletedBoard = KanbanBoard.objects.get(kanban_board_id = input_kanban_board_id)
        toBeDeletedBoard.delete()
        return JsonResponse("Deleted",status = status.HTTP_200_OK, safe = False)
    
class updateKanbanBoard(View):
    def put(self, request, input_kanban_board_id):
        # Checking input kanban board id is valid or not
        if not checkParameter(input_kanban_board_id):
            return all_error_dictionary['invalid_id_error']
        
        # Checking request data is valid or not
        jsonDataOfRequest = json.loads(request.body)
        if not checkRequestData(jsonDataOfRequest):
            return all_error_dictionary['request_data_invalid']
        
        exsistingKanbanBoard = KanbanBoard.objects.filter(kanban_board_id = input_kanban_board_id)
        # checking if the board exists or not
        if not exsistingKanbanBoard.exists():
            return all_error_dictionary['not_found_element']
        
        transformer = KanbanBoard.objects.get(kanban_board_id = input_kanban_board_id)
        serializer = KanbanBoardSerializer(transformer, data = jsonDataOfRequest)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_200_OK, safe = False)
        return all_error_dictionary['could_not_update']
           
class getAllEvents(View):
    def get(self, request):
        allEventsList = Event.objects.all()
        serializedEvents = EventSerializer(allEventsList, many = True)
        return JsonResponse(serializedEvents.data, status = status.HTTP_200_OK, safe = False)
    
class getEventByKanbanBoardId(View):
    def get(self, request, input_kanban_board_id):    
        # Checking if input kanban board id is valid or not
        if not checkParameter(input_kanban_board_id):
            return all_error_dictionary['invalid_id_error']
        
        eventsFromPerticularKanbanBoard = Event.objects.filter(kanban_board_id = input_kanban_board_id)
        serializersEvents = EventSerializer(eventsFromPerticularKanbanBoard, many = True)
        return JsonResponse(serializersEvents.data, status = status.HTTP_200_OK, safe = False)
    
class createEvent(View):
    def post(self, request):
        jsonConverted = json.loads(request.body)
        if not checkRequestData(jsonConverted):
            return all_error_dictionary['request_data_invalid']
        
        serializedEvent = EventSerializer(data = jsonConverted)
        if serializedEvent.is_valid():
            serializedEvent.save()
            return JsonResponse(serializedEvent.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedEvent.errors, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
class updateEvent(View):
    def put(self, request,input_event_id):
        if not checkParameter(input_event_id):
            return all_error_dictionary['invalid_id_error']
        
        jsonConverted = json.loads(request.body)
        if not checkRequestData(jsonConverted):
            return all_error_dictionary['request_data_invalid']
        
        eventExistsCheck = Event.objects.filter(event_id = input_event_id)
        if not eventExistsCheck.exists():
            return all_error_dictionary['not_found_element']
        
        searchedEvent = Event.objects.get(event_id = input_event_id)
        serializedEvent = EventSerializer(searchedEvent, data = jsonConverted)
        if serializedEvent.is_valid():
            serializedEvent.save()
            return JsonResponse(serializedEvent.data, status = status.HTTP_200_OK, safe = False)
        else:
            return all_error_dictionary['could_not_update']
    
class deleteEvent(View):
    def delete(self, request, input_event_id):
        toBeDeletedEvent = Event.objects.get(event_id = input_event_id)
        toBeDeletedEvent.delete()
        return JsonResponse("Deleted!", status = status.HTTP_200_OK, safe = False)
    
class getCommentsByEventId(View):
    def get(self, request, input_event_id):
        commentsForPerticularEvent = Comment.objects.filter(event = input_event_id)
        serializersComments = CommentSerializer(commentsForPerticularEvent, many = True)
        return JsonResponse(serializersComments.data, status = status.HTTP_200_OK, safe = False)
    
class createComment(View):
    def post(self, request):
        requestConvertedToJson = json.loads(request.body)
        serializedComment = CommentSerializer(data = requestConvertedToJson)
        if serializedComment.is_valid():
            serializedComment.save()
            return JsonResponse(serializedComment.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedComment.errors, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
class updateComment(View):
    def put(self, request,input_comment_id):
        requestConvertedToJson = json.loads(request.body)
        searchedComment = Comment.objects.get(comment_id = input_comment_id)
        serializedComment = CommentSerializer(searchedComment, data = requestConvertedToJson)
        if serializedComment.is_valid():
            serializedComment.save()
            return JsonResponse(serializedComment.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedComment.errors, status = status.HTTP_400_BAD_REQUEST ,safe = False)

class deleteComment(View):
    def delete(self, request, input_comment_id):
        toBeDeletedComment = Comment.objects.get(comment_id = input_comment_id)
        toBeDeletedComment.delete()
        return JsonResponse("Deleted!", status = status.HTTP_200_OK, safe = False)
        
            

