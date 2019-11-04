import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "components/SignOut";
import { AuthUserContext } from "components/Session";
import * as ROUTES from "constants/routes";
import * as ROLES from "constants/roles";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      {authUser.role === ROLES.ADMIN && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
    </ul>
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>SignIn</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
