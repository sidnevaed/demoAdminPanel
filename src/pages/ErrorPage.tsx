import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const ErrorPage = () => {
  const error = useRouteError();
  const { title, message } = getErrorContents(error);
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Alert variant="outlined" severity="error" onClose={() => navigate("/")}>
        <h1>{title}</h1>
        <h2>
          <strong>{message}</strong>
        </h2>
      </Alert>
    </Box>
  );

  function getErrorContents(error: unknown) {
    const defaultTitle = "Произошла ошибка!";
    const defaultMessage = "Что-то пошло не так!";
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 500:
          return {
            title: defaultTitle,
            message: "Проблема на сервере.",
          };
        case 404:
          return {
            title: "Не найдено!",
            message: "Невозможно найти страницу или ресурс.",
          };
        default:
          return {
            title: defaultTitle,
            message: defaultMessage,
          };
      }
    } else throw error;
  }
};
