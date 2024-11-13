import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonBase } from '@mui/material';

import config from 'config';
import Logo from 'ui-component/Logo';
import logo from './car_wash_logo.jpg';
import { MENU_OPEN } from 'store/actions';

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <img src={logo} alt="Logo" style={{ maxHeight: '60px', width: '120px' }} />
    </ButtonBase>
  );
};

export default LogoSection;
