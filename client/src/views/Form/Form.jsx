import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../../redux/actions";
import validations from "../../utils/validations";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  const alert = useSelector((state) => state.alert);

  const [formData, setFormData] = useState({
    //* Estado local para los inputs
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    age: "",
    temperaments: [],
    image: "",
  });

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const [errors, setErrors] = useState({});

  const sortedTemps = temperaments?.sort((a, b) =>
    a.name.localeCompare(b.name)
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
    const selectedTemperament = temperaments.find(
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
      //   ↑   devuelve un array con todas las propiedades (claves) del objeto
      const selectedTemperamentNames = selectedTemperaments.map(
        (temp) => temp.id //devuelve el valor de su propiedad id, contiene solo los nombres de los temperamentos
      );

      const dogData = {
        ...formData,
        temperaments: selectedTemperamentNames,
      };

      dispatch(createDog(dogData));
      setFormData({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        age: "",
        temperaments: [],
        image: "",
      });
      setSelectedTemperaments([]);
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

  const isFormComplete =
    formData.name &&
    formData.minHeight &&
    formData.maxHeight &&
    formData.minWeight &&
    formData.maxWeight &&
    formData.age &&
    formData.image &&
    selectedTemperaments.length > 0 &&
    Object.keys(errors).length === 0;
  // Verificar si todos los campos del formulario están completos y si no hay errores

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <div className={style.subContainer}>
        {alert.message && (
          <div
            className={`${style.alert} ${
              alert.type === "success"
                ? style.alertMessage
                : style.alertMessageFailure
            }`}
          >
            {alert.message}
          </div>
        )}
        <h1 className={style.title}>Create your own dog breed!</h1>
        <div className={style.label}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Breed name..."
            className={style.input}
          />
          {errors.name && <p className={style.errors}>{errors.name}</p>}
        </div>
        <div className={style.label}>
          <label>Minumum height:</label>
          <input
            type="text"
            name="minHeight"
            value={formData.minHeight}
            onChange={handleChange}
            placeholder="Minimum Height..."
            className={style.input}
          />
          {errors.minHeight && (
            <p className={style.errors}>{errors.minHeight}</p>
          )}
        </div>
        <div className={style.label}>
          <label>Maximum height:</label>
          <input
            type="text"
            name="maxHeight"
            value={formData.maxHeight}
            onChange={handleChange}
            placeholder="Maximum Height..."
            className={style.input}
          />
          {errors.maxHeight && (
            <p className={style.errors}>{errors.maxHeight}</p>
          )}
        </div>
        <div className={style.label}>
          <label>Minimum weight:</label>
          <input
            type="text"
            name="minWeight"
            value={formData.minWeight}
            onChange={handleChange}
            placeholder="Minimum Weight..."
            className={style.input}
          />
          {errors.minWeight && (
            <p className={style.errors}>{errors.minWeight}</p>
          )}
        </div>
        <div className={style.label}>
          <label>Maximum weight:</label>
          <input
            type="text"
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleChange}
            placeholder="Maximum Weight..."
            className={style.input}
          />
          {errors.maxWeight && (
            <p className={style.errors}>{errors.maxWeight}</p>
          )}
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
          <select
            id="temperaments"
            onChange={handleSelect}
            className={style.select}
          >
            <option value="">Select</option>
            {sortedTemps?.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <div>
            {selectedTemperaments?.map((temp) => (
              <div key={temp.id}>
                <span className={style.span}>{temp.name}</span>
                <button
                  type="button"
                  className={style.tempButton}
                  onClick={() => handleRemove(temp)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {isFormComplete && (
          <div>
            <button type="submit" className={style.formButton}>
              Create
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
