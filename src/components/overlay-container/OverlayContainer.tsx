import "./overlayContainer.css";

const OverlayContainer = ({
  children,
  display,
}: {
  children: React.ReactNode;
  display: boolean;
}) => {
  return <div className={display ? "overlay-container" : "hide-overlay"}>{children}</div>;
};
export { OverlayContainer };
