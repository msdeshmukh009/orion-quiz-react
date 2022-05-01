type ReactChildren = {
  children: React.ReactNode;
};
type ReactChangeEvent = React.ChangeEvent<HTMLInputElement>;

type ReactMouseEvent = React.MouseEvent<HTMLButtonElement>;

type LocationState = {
  from: {
    pathname: string;
  };
};
export type { ReactChildren, ReactChangeEvent, ReactMouseEvent, LocationState };
