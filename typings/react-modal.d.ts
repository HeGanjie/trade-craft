// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/b13eab309f2c3240a60ad8af299c84217fee613b/react-modal/react-modal.d.ts
declare module "react-modal" {
    interface ReactModal {
        isOpen: boolean;
        style?: {
            content?: {
                [key: string]: any;
            },
            overlay?: {
                [key: string]: any;
            }
        },
        appElement?: HTMLElement | {},
        onAfterOpen?: Function,
        onRequestClose?: Function,
        closeTimeoutMS?: number,
        ariaHideApp?: boolean,
        shouldCloseOnOverlayClick?: boolean
    }
    let ReactModal: __React.ClassicComponentClass<ReactModal>;
    export = ReactModal;
}