import clsx from 'clsx'
import { Button, IButton } from '..'


export interface IModalActionsProps {
  actions: IButton[]
  className?: string
}

export const ModalActions: React.FC<IModalActionsProps> = ({
  className = '',
  actions,
}: IModalActionsProps) => {
  const rootClassName = clsx(
    'border-t p-0 m-0 px-8 py-2 fixed bottom-0 left-0 w-full bg-white flex flex-row justify-end gap-3 shadow-100',
    className,
  )
  return (
    <div className={rootClassName}>
      {actions?.map((el: IButton, index: number) => {
        return <Button {...el} key={`button-${index}`} />
      })}
    </div>
  )
}
