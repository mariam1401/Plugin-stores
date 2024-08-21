import { PropsWithChildren, ComponentProps } from 'react';

import { Tooltip as BaseTooltip } from 'react-tooltip';

import styles from './tooltip.module.scss';

export function Tooltip({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof BaseTooltip>>) {
  return (
    <BaseTooltip className={styles.tooltip} place="bottom" noArrow {...props}>
      <div className={styles.content}>{children}</div>
    </BaseTooltip>
  );
}
