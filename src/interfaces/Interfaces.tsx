import { ChangeEventHandler } from "react";

interface WithEmail {
  email: string;
}

export interface FormValuesForNewUser extends WithEmail {
  firstName: string;
  surname: string;
}

export interface FormValuesEditing extends FormValuesForNewUser {
  openedORClosed: string;
}

export interface UsersTypes extends FormValuesEditing {
  id: string;
  maximumRate: number;
  lastTimePlaying: string;
}

export interface AuthState {
  isAuthenticated: boolean;
}

export interface UsersStateType {
  users: UsersTypes[];
}

export interface FormValuesForSignIn extends WithEmail {
  password: string;
}

export interface InputProps {
  label: string;
  type: string;
  name: string;
}

export interface RadioButtonsProps extends InputProps {
  options: { key: string; value: string }[];
}

export interface CSVProps {
  headers: { label: string; key: string }[];
}

export interface SearchProps {
  handleSearch: ChangeEventHandler<HTMLInputElement>;
}

export function isAuthError(e: unknown): e is { code: string } {
  return (e as { code: string }).code !== undefined;
}

export type OneUserResponse = Omit<UsersTypes, "id">;

export type GetUsersResponse = Record<UsersTypes["id"], OneUserResponse>;
