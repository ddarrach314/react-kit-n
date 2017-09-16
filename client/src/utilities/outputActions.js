const targetTypesActionCategories = {
  'Object': ['setIn', 'delete'],
  'Array': ['setIn', 'delete', 'add']
};

export const getActionCategoriesForTargetType = (targetType) => {
  return targetTypesActionCategories.hasOwnProperty(targetType) 
    ? targetTypesActionCategories[targetType] 
    : ['set'];
};