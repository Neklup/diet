package com.neklup.diet.service

import com.neklup.diet.controller.model.SuggestionRequest
import com.neklup.diet.model.Meal
import com.neklup.diet.model.MealType
import com.neklup.diet.repository.MealRepository
import org.springframework.stereotype.Service
import kotlin.math.absoluteValue

@Service
class MealService(private val mealRepository: MealRepository) {
    fun getMeals(): List<Meal> = mealRepository.findAll()
    fun <T, S> Collection<T>.cartesianProduct(other: Iterable<S>): List<Pair<T, S>> {
        return cartesianProduct(other) { first, second -> first to second }
    }

    fun <T, S, V> Collection<T>.cartesianProduct(other: Iterable<S>, transformer: (first: T, second: S) -> V): List<V> {
        return this.flatMap { first -> other.map { second -> transformer.invoke(first, second) } }
    }
    fun suggestFood(request: SuggestionRequest): List<List<Meal>> {
        val mealList =getMeals()
        val selectedMeal = mealRepository.getOne(request.selectedMealId)
        val mealTypes = MealType.values().filter { it != selectedMeal.mealType }
        val mealsTypeOne = mealList.filter { it.mealType == mealTypes[0] }
        val mealsTypeTwo = mealList.filter { it.mealType == mealTypes[1] }
        val combinations = mealsTypeOne.cartesianProduct(mealsTypeTwo)
       return combinations.sortedBy { (request.calories - it.first.calories - it.second.calories - selectedMeal.calories).absoluteValue }
           .map {  listOf(it.first,it.second,selectedMeal) }
           .take(5)



    }

    fun addMeal(meal: Meal): Meal {

        return mealRepository.save(meal)
    }
    fun editMeal(meal: Meal): Meal {

        return mealRepository.save(meal)
    }
    fun deleteMeal(id:Long)= mealRepository.delete(mealRepository.getOne(id))

    fun deleteMeals(ids:List<Long>) {
        ids.forEach {
            mealRepository.delete(mealRepository.getOne(it))
        }
    }
}
