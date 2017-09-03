const targetTypesActionCategories = {
  'object': ['setIn', 'delete'],
  'array': ['setIn', 'delete', 'add']
};

export const getActionCategoriesForTargetType = (targetType) => {
  return targetTypesActionCategories.hasOwnProperty(targetType) 
    ? targetTypesActionCategories[targetType] 
    : ['set'];
};