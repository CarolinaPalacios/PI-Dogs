import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../../redux/actions";
import validations from "../../utils/validations";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  const [formData, setFormData] = useState({
    //* Estado local para los inputs
    name: "",
    height: "",
    weight: "",
    age: "",
    temperaments: [],
    image: "",
  });

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [errors, setErrors] = useState({});
  const [filterValue] = useState("");

  const filteredTemperaments = temperaments?.filter((temp) =>
    temp.name.includes(filterValue)
  );

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value }; // Actualizar los valores de formData

    const validationErrors = validations(updatedFormData); // Validar los datos actualizados

    setFormData(updatedFormData); // Actualizar el estado formData
    setErrors(validationErrors); // Actualizar el estado de errores
  };

  const handleSelect = (event) => {
    //* Selección de temperamentos para que se mantengan los seleccionados
    const selectedTemperament = filteredTemperaments.find(
      (temp) => temp.name === event.target.value
    );
    if (
      selectedTemperament &&
      !selectedTemperaments.includes(selectedTemperament)
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        temperaments: [...prevFormData.temperaments, selectedTemperament],
      }));

      setSelectedTemperaments((prevSelectedTemperaments) => [
        ...prevSelectedTemperaments,
        selectedTemperament,
      ]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validations(formData);

    if (Object.keys(validationErrors).length === 0) {
      const selectedTemperamentNames = selectedTemperaments.map(
        (temp) => temp.id
      );

      const dogData = {
        ...formData,
        temperaments: selectedTemperamentNames,
      };

      dispatch(createDog(dogData));
      setFormData({
        name: "",
        height: "",
        weight: "",
        age: "",
        temperaments: [],
        image: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRemove = (temperament) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      temperaments: prevFormData.temperaments.filter(
        (temp) => temp !== temperament
      ),
    }));
    setSelectedTemperaments((prevSelectedTemperaments) =>
      prevSelectedTemperaments.filter((temp) => temp !== temperament)
    );
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <h1 className={style.title}>Create your own dog breed!</h1>
      <div className={style.label}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Breed name"
          className={style.input}
        />
        {errors.name && <p className={style.errors}>{errors.name}</p>}
      </div>
      <div className={style.label}>
        <label>Height:</label>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height min - height max"
          className={style.input}
        />
        {errors.height && <p className={style.errors}>{errors.height}</p>}
      </div>
      <div className={style.label}>
        <label>Weight:</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight min - weight max"
          className={style.input}
        />
        {errors.weight && <p className={style.errors}>{errors.weight}</p>}
      </div>
      <div className={style.label}>
        <label>Life Span:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Min - max"
          className={style.input}
        />
        {errors.age && <p className={style.errors}>{errors.age}</p>}
      </div>
      <div className={style.label}>
        <label>URL Image:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com"
          className={style.input}
        />

        {errors.image && <p className={style.errors}>{errors.image}</p>}
      </div>
      <div className={style.label}>
        <label htmlFor="temperament"> Temperaments:</label>
        {errors.temperaments && (
          <p className={style.errors}>{errors.temperaments}</p>
        )}
        <select
          id="temperaments"
          onChange={handleSelect}
          className={style.select}
        >
          <option value="">Select </option>
          {filteredTemperaments?.sort().map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
        <div>
          {selectedTemperaments?.sort().map((temp, index) => (
            <div key={index}>
              <span>{temp.name}</span>
              <button type="button" onClick={() => handleRemove(temp)}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button type="submit" className={style.formButton}>
          Create
        </button>
      </div>
    </form>
  );
};

export default Form;
