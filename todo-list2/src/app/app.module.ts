import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { ListingService } from './listing.service';
import { AppComponent } from './app.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { HttpClientModule } from '@angular/common/http';
import { EdititemComponent } from './edititem/edititem.component';
import { AdditemComponent } from './additem/additem.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    EdititemComponent,
    AdditemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ListingService, HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
