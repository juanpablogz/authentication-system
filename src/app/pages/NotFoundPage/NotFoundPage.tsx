import React from 'react';
//import { useHistory } from 'react-router-dom';

type Props = {
  readonly className?: string;
};

const NotFoundPage: React.FC<Props> = () => {
  //const history = useHistory()
  //const goToDashboard = (): void => history.push('/dashboard')

  return (
    <div>
      <h1>Prueba 404 Not found page</h1>
    </div>
  );
};

export default NotFoundPage;
