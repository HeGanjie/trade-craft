declare module 'react-i18next' {
    import { ComponentClass, Component, StatelessComponent, ReactNode } from 'react';
    import * as i18next from 'i18next';

    interface I18nextProviderProps {
        i18n?: I18next.I18n;
        children?: ReactNode;
    }
    export class I18nextProvider extends Component<I18nextProviderProps, {}> { }

    export function translate(namespaces?: string[], options?: {}): any
}