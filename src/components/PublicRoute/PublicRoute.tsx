import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

interface IPublicRoute {
  redirectPath: string;
  children: any;
  restricted: boolean;
}

export const PublicRoute = ({
  redirectPath = "/auth",
  children,
  restricted = false,
}: IPublicRoute) => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { isAutorizated } = useAppSelector((store) => store.auth);

  if (isAutorizated && restricted) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
