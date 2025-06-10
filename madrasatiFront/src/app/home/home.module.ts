import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from "../shared/footer/footer.component";






@NgModule({
    declarations: [
        HomeComponent,
    ],
    providers: [],
    bootstrap: [HomeComponent],
    imports: [
        FormsModule, ReactiveFormsModule,
        MatDividerModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        HomeRoutingModule,
        RouterModule.forChild([
            {
                path: '', component: HomeComponent
            }
        ]),
        SharedModule,
        FooterComponent
    ]
})
export class HomeModule { }