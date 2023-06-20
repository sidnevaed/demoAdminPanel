import { Link } from "react-router-dom";

export const HomePage = () => (
  <>
    <h1>Панель администратора мобильной игры</h1>
    <h2>
      <Link to="/signin">
        Если хотите ознакомиться с содержанием, пройдите авторизацию
      </Link>
    </h2>
  </>
);
