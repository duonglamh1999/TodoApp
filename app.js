let todoForm = document.querySelector('#toDoForm');
let todoInput= document.querySelector('input[name="items"]')
let todoList = document.querySelector('#toDoList')


let savedTodos =JSON.parse(localStorage.getItem('todos'))||[];
let newid = savedTodos.length? (savedTodos.length)-1:0

for (todo of savedTodos){
 retoreTodo(todo);
}

todoForm.addEventListener('submit', submit)

todoList.addEventListener('click', click)

function submit(e){
   e.preventDefault();
   makeNewTodo(todoInput.value);
   todoInput.value='';
}
function click (e){
   if (e.target.tagName==='BUTTON')
   { 
      deteleTodo(e);
   }
   else if(e.target.className==='checkbox') {
   e.target.parentNode.firstChild.classList.toggle('finished');
   updateCompletion(e)
   }
   localStorage.setItem("todos", JSON.stringify(savedTodos));
}
function deteleTodo(e)
{
      let btnParent = e.target.parentElement;
      for (let i =0; i<savedTodos.length;i++)
      {
         if (btnParent.id==savedTodos[i].id)
         {savedTodos.splice(i,1);}
      }
      btnParent.remove();
}
function updateCompletion (e)
{
   for (let i =0; i<savedTodos.length;i++)
   {
      if (e.target.parentElement.id==savedTodos[i].id)
      { 
         savedTodos[i].completed= e.target.parentNode.firstChild.classList.contains('finished')?'true':'false'
      }
   }
}
function retoreTodo(todo)
{
   let newLi =document.createElement('li')
   let newTodo = document.createElement('div');
   let newButton= document.createElement('button');
   let newCheckox = document.createElement('input')
   newTodo.setAttribute('class','todo');
   newLi.innerText=todo.task;
   newCheckox.setAttribute('type','checkbox');
   newCheckox.setAttribute('class','checkbox');
   newTodo.setAttribute("id",todo.id);
   if (todo.completed=='true')
   {
   newLi.setAttribute("class",'finished')
   newCheckox.checked=true;
   }
   newButton.innerText='x';
   newTodo.append(newLi);
   newTodo.append(newCheckox);
   newTodo.append(newButton);
   todoList.append(newTodo);
}
function makeNewTodo (todo)
{
   let newTodo = document.createElement('div')
   let newLi = document.createElement('li');
   let newButton= document.createElement('button');
   let newCheckox = document.createElement('input')
   newLi.innerText=todo;
   newTodo.setAttribute("id",newid);
   newTodo.setAttribute('class','todo')
   newButton.innerHTML='x';
   newCheckox.setAttribute('type','checkbox');
   newCheckox.setAttribute('class','checkbox');
   newTodo.append(newLi);
   newTodo.append(newCheckox);
   newTodo.append(newButton);
   todoList.append(newTodo);
   savedTodos.push({task:todo,completed:'false',id:newid});
   newid++;
   localStorage.setItem('todos', JSON.stringify(savedTodos));
}

