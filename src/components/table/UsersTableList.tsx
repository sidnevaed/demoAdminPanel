import { NavLink } from "react-router-dom";
import { fetchUsers } from "../../store/usersSlice";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UsersTableComponent } from "./UsersTableComponent";
import classes from "./UsersTable.module.scss";
import { SearchForm } from "../forms/SearchForm";
import { CSVLinkComponent } from "./CSVLinkComponent";

export const UsersTableList = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const users = useAppSelector((state) => state.usersLists.users);
  const data = {
    nodes: users.filter((user) =>
      user.surname.toLowerCase().includes(search.toLowerCase()),
    ),
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const headers = [
    { label: "Имя игрока", key: "firstName" },
    { label: "Фамилия игрока", key: "surname" },
    { label: "E-mail игрока", key: "email" },
    { label: "Максимальный балл", key: "maximumRate" },
    { label: "Дата последней игры", key: "lastTimePlaying" },
    { label: "Открыт доступ к игре?", key: "openedORClosed" },
  ];

  return (
    <>
      <h1>Список игроков</h1>
      <div className={classes["button-container"]}>
        <NavLink to="/createUser">
          <button type="button" className={classes["user-buttons"]}>
            Зарегистрировать нового пользователя
          </button>
        </NavLink>
        <CSVLinkComponent headers={headers} />
      </div>

      <SearchForm handleSearch={handleSearch} />
      <UsersTableComponent data={data} />
    </>
  );
};
