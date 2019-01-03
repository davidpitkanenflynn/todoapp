import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { EdititemComponent } from './edititem/edititem.component';
import { AdditemComponent } from './additem/additem.component';

const routes: Routes = [
  { path: 'display', component: TodoItemsComponent },
  { path: 'edit', component: EdititemComponent },
  { path: 'add', component: AdditemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TodoItemsComponent, EdititemComponent, AdditemComponent];
