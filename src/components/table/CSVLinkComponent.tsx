import { CSVLink } from "react-csv";
import { fetchUsers } from "../../store/usersSlice";
import classes from "./UsersTable.module.scss";
import { CSVProps } from "../../interfaces/Interfaces";
import { useAppSelector } from "../../store/hooks";

export const CSVLinkComponent = ({ headers }: CSVProps) => {
  const users = useAppSelector((state) => state.usersLists.users);

  return (
    <>
      <CSVLink headers={headers} data={users} filename={"users_table.csv"}>
        <button
          type="button"
          onClick={fetchUsers}
          className={classes["user-buttons"]}
        >
          Отправить в Excel
        </button>
      </CSVLink>
    </>
  );
};
