import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { TrainingsPageModule } from "./pages/trainings/trainings.module";
import { SettingsPageModule } from "./pages/settings/settings.module";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { TimingPageModule } from "./pages/timing/timing.module";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        TimingPageModule,
        TrainingsPageModule,
        SettingsPageModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SQLite,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
