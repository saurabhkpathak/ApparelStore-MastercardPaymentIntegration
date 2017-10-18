import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChildComponentComponent } from './child-component/child-component.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: ChildComponentComponent },
  { path: 'hero/:id', component: ChildComponentComponent },
  {
    path: 'heroes',
    component: ChildComponentComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: ChildComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChildComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
