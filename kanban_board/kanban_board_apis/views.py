from http.client import HTTPResponse
import json
from django.http import HttpResponseRedirect, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from django.views import View  
from django.views.decorators.csrf import csrf_exempt

from .serializers import *
from .models import *

# Create your views here.
# @api_view(['POST'])
# def createNewBoard(request):
#     serializedBoardData = TaskSerializer(data = request.data)
#     if serializedBoardData.is_valid():
#         serializedBoardData.save()
#         return JsonResponse(serializedBoardData.data, status = status.HTTP_201_CREATED, safe = False)
    

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
class createKanbanBoard(View):
    def post(self, request, input_user_id):
        creatingUser = User.objects.filter(user_id = input_user_id)
        if creatingUser :
            jsonData = json.loads(request.body)
            serializedBoardData = KanbanBoardSerializer(data=jsonData)
            if serializedBoardData.is_valid():
                serializedBoardData.save()
                return JsonResponse(serializedBoardData.data, status = status.HTTP_200_OK, safe = False)
            else:
                print("error 1")
                return JsonResponse("", status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            message = '{"message" : "No User with this user_id"}'
            jsonMessage = json.loads(message)
            # print("error 2")
            return JsonResponse(jsonMessage, status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
    def 
        

