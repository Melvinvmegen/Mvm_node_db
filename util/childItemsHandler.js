exports.updateOrCreateChildItems = async function(model, all_child_items, mutable_child_items) {
  if (!mutable_child_items) return
  const createChildItemsPromises = [],
        updateChildItemsPromises = [],
        diff = mutable_child_items.filter((mutable_child_item) => mutable_child_item.id === undefined),
        included = mutable_child_items.filter((mutable_child_item) => all_child_items.some((initial_child_item) => initial_child_item.id == mutable_child_item.id))

  diff.forEach(child_item => createChildItemsPromises.push(model.create(child_item)))
  
  included.forEach(child_item => {
    model.findByPk(child_item.id).then(found_child_item => {
      if (child_item._destroy) {
        updateChildItemsPromises.push(found_child_item.destroy())
      } else {
        Object.keys(child_item).forEach((key) => found_child_item[key] = child_item[key])
        updateChildItemsPromises.push(found_child_item.save())
      }
    })
  })
  
  await Promise.all(createChildItemsPromises)
  await Promise.all(updateChildItemsPromises)
}