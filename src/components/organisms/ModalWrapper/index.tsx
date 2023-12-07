import React, { Component } from 'react'
import { IModalComponentProps, MainModalComponent } from '../..'

export interface IModalWrapperProps extends IModalComponentProps {
  component?: React.FC<any> // React FC as component
  ref?: any // @todo specify ref object
  id?: number
}

export class ModalWrapper extends Component<unknown, { modals: IModalWrapperProps[] }> {
  state: any = {
    modals: [], // Array maintained for opening multiple modals at the same time
  }

  totalIndex = 0

  open = ({ ...args }: IModalWrapperProps) => {
    const sheet = { ...args }

    const { modals } = this.state

    // isVisible controls the visibility of bottomsheet
    this.totalIndex++
    ;(sheet as any).isOpen = true
    ;(sheet as any).id = this.totalIndex

    // ref controls the bottomsheet behaviour, like closing the sheet our update the modal
    if (!sheet.ref) {
      sheet.ref = React.createRef()
    }

    modals.push({ ...sheet })
    this.setState({ modals })
  }

  close = (index: number = this.state.modals.length - 1) => {
    const { modals } = this.state
    setTimeout(() => {
      modals.splice(index, 1)
      this.setState({ modals })
    }, 200)

    // in order to retain close effect
    if (modals[index]) {
      modals[index].isOpen = false
      this.setState({ modals })
    }
  }

  disable = (value: boolean) => {
    let { modals } = this.state
    modals = modals.map((el: any) => ({
      ...el,
      disable: value,
    }))

    this.setState({ modals })
  }

  updateModalProps = (
    { ...props }: { [key: string]: any },
    index: number = this.state.modals.length - 1,
  ) => {
    const { modals } = this.state

    const modalRef = modals[index]?.ref
    if (modalRef) {
      modalRef.current?.updateProps(props)
    }
  }

  render() {
    const { modals } = this.state

    return modals.map((sheet: any, index: number) => {
      return (
        <MainModalComponent
          key={sheet.id + '' + index}
          closeModal={this.close.bind(this)}
          {...sheet}
        />
      )
    })
  }
}
