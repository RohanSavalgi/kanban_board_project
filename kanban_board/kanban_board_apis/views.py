from abc import abstractmethod
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
    "no_elements_found": JsonResponse(json.loads('{"error" : "No elements found."}'), status = status.HTTP_404_NOT_FOUND, safe = False),
}

# Checking functions
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
class GetData():
    @abstractmethod
    def get():
        pass
class PostData():
    @abstractmethod
    def post():
        pass
class PutData():
    @abstractmethod
    def put():
        pass
class DeleteData():
    @abstractmethod
    def delete():
        pass

# KANBAN BOARD APIS
# LISTES ALL THE KANBAN BOARDS CREATED BY THE USER
class getKanbanBoardByUserId(View, GetData):
    def get(self, request, input_user_id):
        # checking if the input user is is valid or not
        if not checkParameter(input_user_id):
            return all_error_dictionary['invalid_id_error'] 
        
        # Get logic
        allKanbanBoardsByUsedId = KanbanBoard.objects.filter(user_id = input_user_id)
        serializedAllKanbanBoardsByUsedId = KanbanBoardSerializer(allKanbanBoardsByUsedId, many = True)
        return JsonResponse(serializedAllKanbanBoardsByUsedId.data, status = status.HTTP_200_OK, safe = False)

# CREATES A NEW KANBAN BOARD FOR THE USER    
class createKanbanBoard(View, PostData):
    def post(self, request, input_user_id):
        # Checking if the parameter is valid or not
        if not checkParameter(input_user_id):
            return all_error_dictionary['invalid_id_error']            
        
        # check all the inputs are correct or not
        jsonDataOfRequest = json.loads(request.body)
        if not checkRequestData(jsonDataOfRequest):
            return all_error_dictionary['request_data_invalid']
        
        # Checking if user exists or not
        creatingUser = Users.objects.filter(user_id = input_user_id)
        if not creatingUser.exists():
            return all_error_dictionary['not_found_element']

        serializedBoardData = KanbanBoardSerializer(data=jsonDataOfRequest)
        if serializedBoardData.is_valid():
            serializedBoardData.save()
            return JsonResponse(serializedBoardData.data, status = status.HTTP_200_OK, safe = False)
        else:
            return all_error_dictionary['invalid_id_error']
           
# EVENTS APIS
# ALL EVENTS VIEWS
class EventData(View, PostData, GetData):    
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
    def get(self, request, input_kanban_id):
        if not checkParameter(input_kanban_id):
            return all_error_dictionary['invalid_id_error']
        
        eventsExist = Event.objects.filter(kanban_board_id = input_kanban_id)
        if not eventsExist.exists():
            return all_error_dictionary['not_found_element']
        
        eventsByPriorityId = Event.objects.filter(kanban_board_id = input_kanban_id)
        eventsByPriorityIdJson = EventSerializer(eventsByPriorityId, many = True)
        return JsonResponse(eventsByPriorityIdJson.data, status = status.HTTP_200_OK, safe = False)
    
# DELELE, UPDATE AND GET EVENTS BY ID
class EventById(View, GetData, DeleteData, PutData):
    def delete(self, request, input_event_id):
        # Checking if the input event id is valid or not
        if not checkParameter(input_event_id):
            return all_error_dictionary['invalid_id_error']
        
        eventExist = Event.objects.filter(event_id = input_event_id)
        if not eventExist.exists():
            return all_error_dictionary['not_found_element']
        
        toBeDeletedEvent = Event.objects.get(event_id = input_event_id)
        toBeDeletedEvent.delete()
        return JsonResponse("Deleted!", status = status.HTTP_200_OK, safe = False)
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
            return JsonResponse(serializedEvent.errors, status = status.HTTP_204_NO_CONTENT, safe = False)
    
    def get(self, request, input_event_id):
        if not checkParameter(input_event_id):
            return all_error_dictionary['invalid_id_error']

        oneKanbanBoard = Event.objects.filter(event_id = input_event_id)
        #checking if it exists or not
        if oneKanbanBoard.exists():
            # Get Logic
            serializedBoard = EventSerializer(oneKanbanBoard, many = True)
            return JsonResponse(serializedBoard.data, status = status.HTTP_200_OK, safe = False)
        else:
            return all_error_dictionary['not_found_element']
    
# COMMENTS APIS
# ALL COMMENTS VIEWS    
class getCommentsByEventId(View):
    def get(self, request, input_event_id):
        if not checkParameter(input_event_id):
            return all_error_dictionary['invalid_id_error']
        
        eventExists = Event.objects.filter(event_id = input_event_id)
        if not eventExists.exists():
            return all_error_dictionary['not_found_element']
        
        commentsForPerticularEvent = Comment.objects.filter(event = input_event_id)
        if not commentsForPerticularEvent.exists():
            return all_error_dictionary['no_elements_found']
            
        serializersComments = CommentSerializer(commentsForPerticularEvent, many = True)
        return JsonResponse(serializersComments.data, status = status.HTTP_200_OK, safe = False)
    
# CREATES A NEW COMMENT ON THE EVENT
class createComment(PostData, View):
    def post(self, request):
        requestConvertedToJson = json.loads(request.body)
        # if checkRequestData(request):
        #     return all_error_dictionary['request_data_invalid']
        
        serializedComment = CommentSerializer(data = requestConvertedToJson)
        if serializedComment.is_valid():
            serializedComment.save()
            return JsonResponse(serializedComment.data, status = status.HTTP_200_OK, safe = False)
        else:
            return JsonResponse(serializedComment.errors, status = status.HTTP_400_BAD_REQUEST, safe = False)

# STATUS API
# GET ALL THE STATUS     
class getAllStatus(GetData ,View):
    def get(self, request):
        allStatus = Status.objects.all()
        serializedStatus = StatusSerializer(allStatus, many = True)
        return JsonResponse(serializedStatus.data, status = status.HTTP_200_OK, safe = False)
    
# PRIORITY APIS
# GET ALL PRIORITY
class getAllPriority(GetData ,View):
    def get(self, request):
        allPriority = Priority.objects.all()
        serializedPriority = PrioritySerializer(allPriority, many = True)
        return JsonResponse(serializedPriority.data, status = status.HTTP_200_OK, safe = False)
    
# AUTH APIS
# LOGIN FUNCTIONALITY
class login(PostData, View):
    def post(self, request):
        # print(request.json());
        requestConvertedToJson = json.loads(request.body)
        getUsername = Users.objects.filter(user_email = requestConvertedToJson['user_email'])
        if not getUsername.exists():
            return JsonResponse("Failed", status = status.HTTP_403_FORBIDDEN, safe = False) 
        getUser = Users.objects.get(user_email = requestConvertedToJson['user_email'])
        serializedUser = UserSerializer(getUser);
        if serializedUser.data['user_password'] == requestConvertedToJson['user_password']:
                return JsonResponse(serializedUser.data, status = status.HTTP_200_OK, safe = False)
        return JsonResponse("Failed", status = status.HTTP_403_FORBIDDEN, safe = False) 
    
# REGISTER A NEW USER FUNCTIONALITY
class register(PostData, View):
    def post(self, request):
        userData = json.loads(request.body)
        if not checkRequestData(userData):
            return all_error_dictionary['request_data_invalid']
                
        serializedUserData = UserSerializer(data = userData)
        if serializedUserData.is_valid():
            serializedUserData.save()
            return JsonResponse("Registered", status = status.HTTP_200_OK, safe = False);
        else:
            return JsonResponse(serializedUserData.errors, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
# USER APIS    
# GETS THE USER DATA BASED ON USER ID    
class getUserById(GetData, View):
    def get(self, request, input_user_id):
        if not checkParameter(input_user_id):
            return all_error_dictionary['invalid_id_error']
        
        eventExists = Users.objects.filter(user_id = input_user_id)
        if not eventExists.exists():
            return all_error_dictionary['not_found_element']
        
        userById = Users.objects.filter(user_id = input_user_id)
        if not userById.exists():
            return all_error_dictionary['no_elements_found']
            
        serializeredUser = UserSerializer(userById, many = True)
        return JsonResponse(serializeredUser.data, status = status.HTTP_200_OK, safe = False)    