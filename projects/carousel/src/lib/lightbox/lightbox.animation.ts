import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

const popoverEnterAnimation = animation(
  animate('{{ timing }}s {{ delay }}s cubic-bezier(0, 0, 0.2, 1)',
    style({ transform: 'none', opacity: 1 })
  ), { params: { timing: 300, delay: 0 } }
);

const popoverLeaveAnimation = animation(
  animate('{{ timing }}s {{ delay }}s cubic-bezier(0, 0, 0.2, 1)',
    style({ opacity: 0, transform: 'scale(0.7)' })
  ), { params: { timing: 300, delay: 0 } }
);

export const dialogAnimation = trigger('dialog', [
  state('void, exit', style({ opacity: 0, transform: 'scale(0.7)' })),
  state('enter', style({ transform: 'none' })),
  transition(':enter',
    useAnimation(popoverEnterAnimation, { params: { timing: 0.3 } })
  ),
  transition(':leave',
    useAnimation(popoverLeaveAnimation, { params: { timing: 0.3 } })
  )
]);
