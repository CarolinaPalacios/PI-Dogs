const validations = (formData) => {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = "Breed name is required";
  } else {
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(formData.name)) {
      errors.name = "Invalid name. Only letters and spaces are allowed";
    }
  }

  if (!formData.minHeight || !formData.minHeight.trim()) {
    errors.minHeight = "Minimum height is required";
  } else if (typeof parseInt(formData.minHeight) !== "number") {
    errors.minHeight = "Invalid height, only numbers allowed";
  } else {
    const heightPattern = /^([9]|[1-9][0-9]|110)$/;
    if (!heightPattern.test(formData.minHeight))
      errors.minHeight = "Invalid height, must be between 9cm and 110cm";
  }

  if (!formData.maxHeight || !formData.maxHeight.trim()) {
    errors.maxHeight = "Maximum height is required";
  } else if (typeof parseInt(formData.maxHeight) !== "number") {
    errors.maxHeight = "Invalid height, only numbers allowed";
  } else {
    const heightPattern = /^([9]|[1-9][0-9]|110)$/;
    if (!heightPattern.test(formData.maxHeight))
      errors.maxHeight = "Invalid height, must be between 9cm and 110cm";
  }

  if (
    formData.minHeight &&
    formData.maxHeight &&
    parseInt(formData.minHeight, 10) > parseInt(formData.maxHeight, 10) //*Al especificar explícitamente la base como 10, nos aseguramos de que el valor se interprete siempre como un número decimal
  ) {
    errors.minHeight = errors.minHeight =
      "Minimum height cannot be greater than maximum height";
    errors.maxHeight = "Maximum height cannot be less than minimum height";
  }

  if (!formData.minWeight || !formData.minWeight.trim()) {
    errors.minWeight = "Minimum weight is required";
  } else if (typeof parseInt(formData.minWeight) !== "number") {
    errors.minWeight = "Invalid weight, only numbers allowed";
  } else {
    const weightPattern = /^(?:[1-9]|[1-8]\d|90)$/;
    if (!weightPattern.test(formData.minWeight))
      errors.minWeight = "Invalid weight, must be between 1kg and 90kg";
  }

  if (!formData.maxWeight || !formData.maxWeight.trim()) {
    errors.maxWeight = "Maximum weight is required";
  } else if (typeof parseInt(formData.maxWeight) !== "number") {
    errors.maxWeight = "Invalid weight, only numbers allowed";
  } else {
    const weightPattern = /^(?:[1-9]|[1-8]\d|90)$/;
    if (!weightPattern.test(formData.maxWeight))
      errors.maxWeight = "Invalid weight, must be between 1kg and 90kg";
  }

  if (
    formData.minWeight &&
    formData.maxWeight &&
    parseInt(formData.minWeight, 10) > parseInt(formData.maxWeight, 10)
  ) {
    errors.minWeight = "Minimum weight cannot be greater than maximum weight";
    errors.maxWeight = "Maximum weight cannot be less than minimum weight";
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
    const imagePattern = /\.(jpeg|jpg|gif|png|svg)$/i;
    if (!urlPattern.test(formData.image)) errors.image = "Invalid Image URL";
    else if (!imagePattern.test(formData.image))
      errors.image = "Must be an image URL";
  }

  if (formData.temperaments.length === 0)
    errors.temperaments = "Temperaments are required";

  return errors;
};

export default validations;
