package com.neklup.diet.controller

import com.neklup.diet.model.Meal
import com.neklup.diet.service.MealService
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpStatusCodeException
import org.springframework.web.server.ResponseStatusException
import java.sql.SQLIntegrityConstraintViolationException

@CrossOrigin
@RestController
@RequestMapping("/meal")
class MealController (private val mealService: MealService) {
    @GetMapping("/list")
    fun getMeals(): List<Meal> = mealService.getMeals()
    @PostMapping("/add")
    fun addMeal(@RequestBody meal:Meal): Meal {
        try {
           return  mealService.addMeal(meal)
        }catch (e: DataIntegrityViolationException) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/edit")
    fun editMeal(@RequestBody meal:Meal): Meal {
        try {
            return  mealService.editMeal(meal)
        }catch (e: DataIntegrityViolationException) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/deleteList")
    fun deleteMeals(@RequestBody ids:List<Long>) = mealService.deleteMeals(ids)

}