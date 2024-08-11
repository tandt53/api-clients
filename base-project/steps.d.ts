/// <reference types='codeceptjs' />
type step_file = typeof import('./steps_file');

declare namespace CodeceptJS {
    interface SupportObject {
        I: I,
        current: any,
    }

    interface I extends ReturnType<steps_file> {
    }

    namespace Translation {
        interface Actions {
        }
    }
}
