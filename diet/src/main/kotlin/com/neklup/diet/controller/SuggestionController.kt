package com.neklup.diet.controller

import com.neklup.diet.controller.model.SuggestionRequest
import com.neklup.diet.model.Meal
import com.neklup.diet.service.MealService
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/suggestion")
class SuggestionController (private val mealService: MealService) {
    @PostMapping
    fun suggestFood (@RequestBody request: SuggestionRequest): List<List<Meal>> {
        return mealService.suggestFood(request)
    }
}