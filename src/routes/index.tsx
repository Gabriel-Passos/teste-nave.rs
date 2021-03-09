import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Home from '../pages/Home';
import RegisterNaver from '../pages/RegisterNaver';
import UpdateNaver from '../pages/UpdateNaver';

const Routes:React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/home" component={Home} isPrivate />
        <Route path="/register" component={RegisterNaver} isPrivate />
        <Route path="/update" component={UpdateNaver} isPrivate />
      </Switch>
    </>
  );
}

export default Routes;