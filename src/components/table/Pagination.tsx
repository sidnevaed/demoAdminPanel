import classes from "./UsersTable.module.scss";

export const Pagination = ({ pagination, data }) => {
  const sizes = [10, 20, 50, 100];

  return (
    <>
      <div className={classes["button-container"]}>
        <div className={classes["user-buttons"]}>
          Показать по следующему количеству игроков:
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              style={{
                fontWeight: pagination.state.size === size ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className={classes["user-buttons"]}>
          <button
            type="button"
            style={{
              fontWeight:
                pagination.state.size === data.nodes.length ? "bold" : "normal",
            }}
            onClick={() => pagination.fns.onSetSize(data.nodes.length)}
          >
            Показать всех игроков
          </button>
        </div>
      </div>
    </>
  );
};
