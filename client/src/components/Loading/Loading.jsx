import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.container}>
      <h2 className={style.loading}>Loading...</h2>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Loading;
