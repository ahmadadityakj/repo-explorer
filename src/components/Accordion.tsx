import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState, type ReactNode } from "react";

const Accordion = ({ children, title, onExpand }: { children: ReactNode, title: string, onExpand(): void }) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className="w-full mb-3">
      <div className="flex flex-row justify-between w-full p-2 bg-gray-200">
        <div className="font-semibold">{title}</div>
        <div>
          {show ? (
            <ChevronUpIcon
              onClick={() => setShow(false)}
              className="cursor-pointer ml-2 size-5"
            />
          ) : (
            <ChevronDownIcon
              onClick={() => {
                setShow(true);
                onExpand();
              }}
              className="cursor-pointer ml-2 size-5"
            />
          )}
        </div>
      </div>
      <div className={clsx(!show && 'hidden', 'text-sm text-secondary p-3 bg-gray-100')}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;