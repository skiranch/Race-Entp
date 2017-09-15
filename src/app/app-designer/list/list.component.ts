import { Component } from '@angular/core';
import { Todo } from '../todo/todo';
import { TodoDataService } from '../todo/todo-data.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare var jQuery: any;

@Component({
    selector: 'app-apps',
    template: `<title>Race Enterprise: App Designer</title>
            <app-designer-header></app-designer-header>
            <section class="container apps">
            <div class="row">
                <div class="col-md-12">
                <div class="row">
                    <div class="col-md-3">
                    <div>
                        <input type="text" placeholder="Search apps" class="form-control" id="search">
                    </div>
                    </div>
                    <div class="col-md-9">
                    <button class="btn btn-primary pull-right" data-toggle="modal" data-target="#createAppModal">Create</button>
                    </div>
                </div>
                <div class="apps__list">
                    <div class="apps__list-item" *ngFor="let item of items | async">
                    <div class="row">
                        <div class="col-md-1">
                        <img src="https://secure.gravatar.com/avatar/9319b07509dc0bf003e35096b6f43d89?s=60&r=g&d=mm" alt="app icon" />
                        </div>
                        <div class="col-md-9">
                        <a href="#app-designer/list/ui" class="apps__list-link"> {{item.name}}</a>
                        <div class="apps__list-desc">{{item.description}}</div>
                        <div class="apps__list-date">{{item.date}}</div>
                        </div>
                        <div class="col-md-2" style="text-align: right;">
                        <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#createAppModal" (click)="updateTodo(item.$key)">Edit</button>
                        <button type="button" class="btn btn-primary btn-xs">Copy</button>
                        <button type="button" class="btn btn-danger btn-xs" (click)="removeTodo(item.$key)">Delete</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <div class="modal fade" tabindex="-1" role="dialog" id="createAppModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" routerLink="/" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Create app</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                    <label for="email">Name</label>
                    <input class="new-todo" class="form-control" required="required" placeholder="App Name" autofocus="" [(ngModel)]="newTodo.name">
                    </div>
                    <div class="form-group">
                    <label for="pwd">Description</label>
                    <input class="new-todo" class="form-control" placeholder="Description" [(ngModel)]="newTodo.description">
                    </div>

                    <div class="form-group">
                    <label for="pwd">Launch Icon</label><br/>
                    <input type="checkbox" [(ngModel)]="newTodo.icon"> <span>Default icon</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" (click)="addTodo(name, description, date, icon)">Create app</button>
                </div>
                </div>
            </div>
            </div>
            <!-- /.modal -->
            <app-designer-footer></app-designer-footer>
            `,
    styles: [`body{
            background: #ddd;
        }`],
    providers: [TodoDataService]
})

export class ListComponent {

    newTodo: Todo = new Todo();
    items: FirebaseListObservable<any[]>;

    public name: string;
    public description: string;
    public date: string;
    public icon: boolean;

    constructor(afDb: AngularFireDatabase) {
        this.items = afDb.list('/items');
    }

    addTodo(name, description, date, icon) {

        this.name = name;
        this.description = description;
        this.date = date;
        this.icon = icon;
        console.log(this.newTodo);
        //close modal window
        jQuery(".modal button.close").click();

        return this.items.push(this.newTodo).then(_ => console.log('item created!'));;
    }

    removeTodo(key: string) {
        return this.items.remove(key).then(_ => console.log('item deleted!'));
    }
}
