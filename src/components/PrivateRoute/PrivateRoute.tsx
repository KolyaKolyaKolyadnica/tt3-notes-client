import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

interface IPrivateRoute {
  redirectPath: string;
  children: any;
}

export const PrivateRoute = ({
  redirectPath = "/auth",
  children,
}: IPrivateRoute) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { isAutorizated } = useAppSelector((store) => store.auth);

  if (!isAutorizated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
