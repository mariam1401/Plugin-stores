'use client';

import { useState } from 'react';

import classNames from 'classnames';

import { IPlugin } from '@/@types/plugin';

import Close from './close.svg';
import Open from './open.svg';

import styles from './faq.module.scss';

interface IItemProps {
  question: string;
  answer: string;
}

function Item({ question, answer }: IItemProps) {
  const [isExpanded, setIsOpen] = useState(false);

  return (
    <div className={styles.item}>
      <div
        onClick={() => setIsOpen((prevState) => !prevState)}
        className={styles.head}
      >
        <h3 className={styles.question}>{question}</h3>
        {isExpanded ? <Close /> : <Open />}
      </div>
      {isExpanded && (
        <div className={styles.answerBlock}>
          <p
            className={classNames(styles.answer, {
              [styles.expanded]: isExpanded,
            })}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQ({ plugin }: { plugin: IPlugin }) {
  if (!plugin.faq?.length) {
    return <div></div>;
  }

  return (
    <div className={styles.faq}>
      <h2 className={styles.title}>FAQ</h2>
      <div className={styles.items}>
        {(plugin?.faq || [])?.map((eachItem) => (
          <div className={styles.itemBlock} key={eachItem?.title}>
            <Item
              question={eachItem?.title || ''}
              answer={eachItem?.value || ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
