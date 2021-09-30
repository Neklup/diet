import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
export default function MealList(props) {
  const { meals, name, updateItems } = props
  const handleOnChange = useCallback(
    (e) => {
      const index = e.target.id
      let items = [...meals]

      items[index].isChecked = e.target.checked
      updateItems(items)
    },
    [meals],
  )
  return (
    <div className="col-sm">
      <h3>{name}</h3>

      {meals.map((meal, index) => {
        return (
          <div className={'row'} key={name + index}>
            <FormControlLabel
              labelPlacement={'end'}
              control={
                <Checkbox
                  checked={meal.isChecked}
                  onChange={handleOnChange}
                  id={index.toString()}
                />
              }
              label={`${meal.name} ${meal.calories}`}
            />
          </div>
        )
      })}
    </div>
  )
}
