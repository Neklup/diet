package com.neklup.diet.repository

import com.neklup.diet.model.Meal
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional(Transactional.TxType.MANDATORY)
interface MealRepository: JpaRepository<Meal, Long>