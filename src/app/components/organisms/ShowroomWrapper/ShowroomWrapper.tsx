import React, { useEffect } from 'react';
import cn from 'classnames';
import { useShowroom } from '@src/app/showroom/ShowroomContext';
type Props = {
  readonly dataJson: string;
  readonly className?: string;
  readonly onLoad: () => void;
};

const ShowroomWrapper: React.FC<Props> = ({ dataJson, onLoad, className }): JSX.Element => {
  /*------------------------*/
  /*  INIT STATES & CONFIG  */
  /*------------------------*/
  const testId = 'ShowroomWrapper';
  const { size } = useShowroom();
  // const listener = useCallback((event) => onLoad(), [onLoad]);

  // Load showroom script
  useEffect(() => {
    onLoad();
  }, [size]); // eslint-disable-line react-hooks/exhaustive-deps

  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const showroomWrapperClass = cn(className);

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div
      className={showroomWrapperClass}
      data-testid={testId}
      id="arlene-showroom"
      data-json={dataJson}
      data-edit-mode={true}
    />
  );
};

export default ShowroomWrapper;
