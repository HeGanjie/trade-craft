import * as _ from 'lodash';

export const trampoline = (f: () => any) => {
    if (_.isFunction(f)) {
        let r = f() as () => any;

        if (r !== null)
            trampoline(r); 
    }
}