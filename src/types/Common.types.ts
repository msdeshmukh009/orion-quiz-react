type ReactChildren = {
  children: React.ReactNode;
};
type ReactChangeEvent = React.ChangeEvent<HTMLInputElement>;

type ReactMouseEvent = React.MouseEvent<HTMLButtonElement>;

type ReactChangeEventSelect = React.ChangeEvent<HTMLSelectElement>;

type LocationState = {
  from: {
    pathname: string;
  };
};
export type {
  ReactChildren,
  ReactChangeEvent,
  ReactMouseEvent,
  LocationState,
  ReactChangeEventSelect,
};
