import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TreeModule } from 'angular-tree-component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { ExerciseComponent } from './components/exercise/exercise.component';
import { FiletreeComponent } from './components/filetree/filetree.component';
import { LandingComponent } from './components/landing/landing.component';

const monacoConfig: NgxMonacoEditorConfig = {
  //baseUrl: 'app-name/assets', // configure base path for monaco editor default: './assets'
  //defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { (<any>window).monaco; } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent,
    FiletreeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TreeModule.forRoot(),
    MonacoEditorModule.forRoot(monacoConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
