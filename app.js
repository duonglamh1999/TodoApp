let todoForm = document.querySelector('#toDoForm');
let todoInput= document.querySelector('input[name="items"]')
let todoList = document.querySelector('#toDoList')


let savedTodos =JSON.parse(localStorage.getItem('todos'))||[];
let newid = savedTodos.length? (savedTodos.length)-1:0

for (todo of savedTodos){
 retoreTodo(todo);
}

todoForm.addEventListener('submit', e=> {
  e.preventDefault();
   makeNewTodo(todoInput.value);
   todoInput.value='';
})

todoList.addEventListener('click', e=>
{
 
   if (e.target.tagName==='BUTTON')
   { 
      deteleTodo(e);
   }
   else{
   e.target.classList.toggle('finished');
   updateCompletion(e)
   }
   localStorage.setItem("todos", JSON.stringify(savedTodos));
})

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
      if (e.target.id==savedTodos[i].id)
      { 
         savedTodos[i].completed= e.target.classList.contains('finished')?'true':'false'
      }
   }
}
function retoreTodo(todo)
{
   let newTodo = document.createElement('li');
   let newButton= document.createElement('button');
   newTodo.innerText=todo.task;
   newTodo.setAttribute("id",todo.id);
   if (todo.completed=='true')
   {
   newTodo.setAttribute("class",'finished')
   }
   newButton.innerText='x';
   newTodo.append(newButton);
   todoList.append(newTodo);
}
function makeNewTodo (todo)
{
   let newTodo = document.createElement('li');
   let newButton= document.createElement('button');
   newTodo.innerText=todo;
   newTodo.setAttribute("id",newid);
   newButton.innerText='x';
   newTodo.append(newButton);
   todoList.append(newTodo);
   savedTodos.push({task:todo,completed:'false',id:newid});
   newid++;
   localStorage.setItem('todos', JSON.stringify(savedTodos));
}

