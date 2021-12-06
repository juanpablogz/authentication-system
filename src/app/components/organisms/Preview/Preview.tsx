import React from 'react';
import cn from 'classnames';

import ShowroomWrapper from '@organisms/ShowroomWrapper/ShowroomWrapper';
// import { useShowroom } from '@src/app/showroom/ShowroomContext';

type Props = {
  readonly dataJson: string;
  readonly className?: string;
  readonly onLoad: () => void;
};
const Preview: React.FC<Props> = ({ dataJson, onLoad, className }) => {
  /*------------------------*/
  /*  INIT STATES & CONFIG  */
  /*------------------------*/
  const testId = 'Preview';
  // const { size } = useShowroom();
  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const previewClass = cn(className, 'relative w-full h-full');

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={previewClass}>
      <ShowroomWrapper dataJson={dataJson} onLoad={onLoad} />
    </div>
  );
};

export default Preview;
