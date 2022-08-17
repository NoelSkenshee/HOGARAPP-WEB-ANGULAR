import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';










import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LogupComponent } from './components/logup/logup.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { VerifyComponent } from './components/verify/verify.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UnexpiredComponent } from './components/unexpired/unexpired.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { ConsumptionComponent } from './components/consumption/consumption.component';
import { ExpiredComponent } from './components/expired/expired.component';
import { DonateDialogComponent } from './components/donate-dialog/donate-dialog.component';
import { DonationsComponent } from './components/donations/donations.component';
import { AverageConsumptionComponent } from './components/average-consumption/average-consumption.component';
import { DietComponent } from './components/diet/diet.component';
import { DietFormComponent } from './components/diet-form/diet-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NodataComponent } from './components/error/error.component';
import { MessageComponent } from './components/message/message.component';
import { ConfigComponent } from './components/config/config.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { ShareComponent } from './components/share/share.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogupComponent,
    VerifyComponent,
    DashboardComponent,
    UnexpiredComponent,
    DrawerComponent,
    NewproductComponent,
    ConsumptionComponent,
    ExpiredComponent,
    DonateDialogComponent,
    DonationsComponent,
    AverageConsumptionComponent,
    DietComponent,
    DietFormComponent,
    FooterComponent,
    SummaryComponent,
    LoaderComponent,
    NodataComponent,
    MessageComponent,
    ConfigComponent,
    VerifyPasswordComponent,
    ShareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
