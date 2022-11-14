from django.shortcuts import render
from models import User

# Create your views here.
def create_account(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    return render(request, 'create_account.html')