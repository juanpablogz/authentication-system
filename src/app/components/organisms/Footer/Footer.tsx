import React from 'react';
import cn from 'classnames';
import { Logo, LogoColor, LogoSize } from '@arleneio/editors-common-ui';

type Props = {
  readonly className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
  const footerClass = cn(className, 'ase-footer', {
    'flex flex-col lg:flex-row items-start px-6 py-8 border-t border-default-smoke': true,
  });

  return (
    <div className={footerClass}>
      <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-left w-full lg:w-1/2 mb-8 lg:mb-0">
        <span className="inline-flex mb-4">
          <Logo color={LogoColor.black} size={LogoSize.sm}></Logo>
        </span>
        <p className="text-sm font-regular text-light-slate max-w-md mb-6">
          It’s a way to standardize the use of UI Components, starting with the naming convention. Our short-term goal
          is to include more details about each component (size, colors, code, best practices, etc).
        </p>
        <ul className="inline-flex flex-wrap justify-center mb-2">
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://trello.com/b/0GkhHSmD/ui-guideline-roadmap"
            >
              Roadmap
            </a>
          </li>
          <li className="text-default-slate font-semi-bold text-base mx-3">•</li>
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/UIGuideline/UIGuideline"
            >
              Github
            </a>
          </li>
          <li className="text-default-slate font-semi-bold text-base mx-3">•</li>
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/uiguideline"
            >
              Twitter
            </a>
          </li>
          <li className="text-default-slate font-semi-bold text-base mx-3">•</li>
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://winning-motivator-1085.ck.page/fb08dec536"
            >
              Subscribe
            </a>
          </li>
          <li className="text-default-slate font-semi-bold text-base mx-3">•</li>
          <li>
            <a
              className="text-default-slate font-semi-bold text-base hover:underline hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.patreon.com/uiguideline"
            >
              Donate
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
        <div className="flex items-center lg:ml-auto">
          <span className="uppercase text-sm text-light-slate font-semi-bold mr-6">was this page helpful?</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
