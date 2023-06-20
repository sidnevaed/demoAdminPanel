import { ReactNode } from "react";
import styles from "./Error.module.scss";

type ChildrenProps = {
  children?: ReactNode;
};

export const TextError = ({ children }: ChildrenProps) => {
  return <div className={styles.error}>{children}</div>;
};
