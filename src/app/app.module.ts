import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { MindmapComponent } from './mindmap/mindmap.component';

@NgModule({
  declarations: [
    AppComponent,
    MindmapComponent
  ],
  imports: [
				BrowserModule,
				DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
