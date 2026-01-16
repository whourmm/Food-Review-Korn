
from django.http import HttpResponseForbidden

from rest_framework.permissions import BasePermission


def check_permissions(user):
    # Check if user is anonymous
    if user.is_anonymous:
        return False
    
    if user.is_active:
        return True
    
# def permission_required(permission_name):
#     def decorator(view_func):
#         def _wrapped_view_func(request, *args, **kwargs):
#             # check for permission
#             if not check_permissions(request.user, permission_name):
#                 # respond 403 Forbidden if failed
#                 return HttpResponseForbidden()
#             return view_func(request, *args, **kwargs)
#         return _wrapped_view_func
#     return decorator

class CustomPermission(BasePermission):
    permission = None

    def has_permission(self, request, view):
        return check_permissions(request.user)

class IsAgentUser(BasePermission):
    permission = None
    
    def has_permission(self, request, view):
        return request.user.is_agentUser