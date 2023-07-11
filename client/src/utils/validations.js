const validations = (formData) => {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = "Breed name is required";
  }

  if (!formData.height || !formData.height.trim()) {
    errors.height = "Height is required";
  } else {
    const heightPattern = /^\d+\s*-\s*\d+$/;
    if (!heightPattern.test(formData.height)) {
      errors.height =
        "Invalid height format. Use 'number - number' (for example, '20 - 110')";
    } else {
      const [minHeight, maxHeight] = formData.height.split("-");
      const min = parseInt(minHeight.trim(), 10);
      const max = parseInt(maxHeight.trim(), 10); //*Al especificar explícitamente la base como 10, nos aseguramos de que el valor se interprete siempre como un número decimal
      if (min > max) {
        errors.height = "Minimum height cannot be greater than maximum height";
      }
    }
  }

  if (!formData.weight || !formData.weight.trim()) {
    errors.weight = "Weight is required";
  } else {
    const weightPattern = /^\d+\s*-\s*\d+$/;
    if (!weightPattern.test(formData.weight)) {
      errors.weight =
        "Invalid weight format. Use 'number - number' (for example, '2 - 90')";
    } else {
      const [minWeight, maxWeight] = formData.weight.split("-");
      const min = parseInt(minWeight.trim(), 10);
      const max = parseInt(maxWeight.trim(), 10);
      if (min > max) {
        errors.weight = "Minimum weight cannot be greater than maximum weight";
      }
    }
  }

  if (!formData.age || !formData.age.trim()) {
    errors.age = "Age is required";
  } else {
    const agePattern = /^\d+\s*-\s*\d+$/;
    if (!agePattern.test(formData.age)) {
      errors.age =
        "Invalid height format. Use 'number - number' (for example, '8 - 20')";
    } else {
      const [minAge, maxAge] = formData.age.split("-");
      const min = parseInt(minAge.trim(), 10);
      const max = parseInt(maxAge.trim(), 10);
      if (min > max) {
        errors.weight = "Minium age cannot be greater than maximum age";
      }
    }
  }

  if (!formData.image || !formData.image.trim()) {
    errors.image = "Image URL is required";
  } else if (formData.image.length > 200) {
    errors.image = "Image URL cannot exceed 200 characters";
  } else {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(formData.image)) {
      errors.image = "Invalid Image URL";
    }
  }

  return errors;
};

export default validations;
