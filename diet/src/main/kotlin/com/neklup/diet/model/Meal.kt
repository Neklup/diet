package com.neklup.diet.model

import com.sun.istack.NotNull
import net.bytebuddy.implementation.bind.annotation.Empty
import javax.persistence.*

@Entity
data class Meal (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long=0,
    val calories: Long=0,
    @Column(unique = true)
    val name: String="",
    @Enumerated(EnumType.STRING)
    val mealType: MealType

)