import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './components/pages/about/about.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { IngredientItemComponent } from './components/ingredient-item/ingredient-item.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    IngredientsComponent,
    IngredientItemComponent,
    RecipesComponent,
    RecipeItemComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
