import { useNavigate } from "react-router-dom";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import { Pagination } from "./Pagination";
import { usePagination } from "@table-library/react-table-library/pagination";
import { SignOut } from "./SignOut";

export const UsersTableComponent = ({ data }) => {
  const navigate = useNavigate();

  const theme = useTheme({
    Table: `
    max-width: 140rem;
    margin: 0 auto;
    
    @media (max-width: 87.87em) {
    max-width:130rem;
    }
    
    @media (max-width: 75em) {
    max-width: 110rem;
    }
    
    @media (max-width: 56.25em) {
    max-width: 90rem;
    }
    
    @media (max-width: 37.5em) {
    max-width: 80rem;
    }
    
    @media (min-width: 112.5em) {
    max-width: 150rem;
    }
    `,

    HeaderRow: `
        .th {
          background-color: var(--color-table-header);
          padding-right: 4rem;
          padding-bottom: 2rem;
          text-align: start;
          
          @media (max-width: 87.87em) {
          font-size: 1.5rem;
          padding-right: 3rem;
          }
          
         @media (max-width: 75em) {
          font-size: 1.2rem;
          padding-right: 2.3rem;
          }
          
          @media (max-width: 56.25em) {
          font-size: 0.8rem;
          padding-right: 2rem;
          }
          
          @media (max-width: 37.5em) {
          font-size: 0.5rem;
          padding-right: 0.3rem;
        }
      `,
    Row: `
        cursor: pointer;
        .td {
          border-top: 1px solid var(--color-table-row-default);
          border-bottom: 1px solid var(--color-table-row-default);
          padding-bottom: 1rem;
        }

        &:hover .td {
          border-top: 1px solid var(--color-table-row-hover);
          border-bottom: 1px solid var(--color-table-row-hover);
         
        }
      `,
  });

  const sort = useSort(
    data,
    { onChange: onSortChange },
    {
      sortFns: {
        PlayerName: (array) =>
          array.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        PlayerSurname: (array) =>
          array.sort((a, b) => a.surname.localeCompare(b.surname)),
        PlayerEmail: (array) =>
          array.sort((a, b) => a.email.localeCompare(b.email)),
        MaximumRate: (array) =>
          array.sort((a, b) => a.maximumRate - b.maximumRate),
        DateOfLastGame: (array) =>
          array.sort((a, b) =>
            a.lastTimePlaying < b.lastTimePlaying ? -1 : 0,
          ),
        HasAccess: (array) =>
          array.sort((a, b) =>
            a.openedORClosed.localeCompare(b.openedORClosed),
          ),
      },
    },
  );
  // * требование библиотеки
  function onSortChange() {
    /// do nothing
  }

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: onPaginationChange,
  });

  // * требование библиотеки
  function onPaginationChange() {
    /// do nothing
  }

  return (
    <>
      <Table data={data} theme={theme} sort={sort} pagination={pagination}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort sortKey="PlayerName">Имя игрока</HeaderCellSort>
                <HeaderCellSort sortKey="PlayerSurname">
                  Фамилия игрока
                </HeaderCellSort>
                <HeaderCellSort sortKey="PlayerEmail">
                  Email игрока
                </HeaderCellSort>
                <HeaderCellSort sortKey="MaximumRate">
                  Максимальный балл
                </HeaderCellSort>
                <HeaderCellSort sortKey="DateOfLastGame">
                  Дата последней игры
                </HeaderCellSort>
                <HeaderCellSort sortKey="HasAccess">
                  Открыт доступ к игре?
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((user) => (
                <Row
                  key={user.id}
                  item={user}
                  title={"Щелкните по игроку для редактирования данных"}
                  onClick={() => {
                    navigate(`/editUser/${user.id}`);
                  }}
                >
                  <Cell>{user.firstName}</Cell>
                  <Cell>{user.surname}</Cell>
                  <Cell>{user.email}</Cell>
                  <Cell
                    style={{
                      color:
                        user.maximumRate >= 300
                          ? "var(--color-table-green-text)"
                          : "var(--color-table-red-text)",
                    }}
                    title={
                      "Если балл зеленого цвета, игрок прошел тест. Красный - нет."
                    }
                  >
                    {user.maximumRate}
                  </Cell>
                  <Cell>
                    {new Date(user.lastTimePlaying).toLocaleDateString("en-GB")}
                  </Cell>
                  <Cell>{user.openedORClosed}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      <Pagination pagination={pagination} data={data} />
      <SignOut />
    </>
  );
};
