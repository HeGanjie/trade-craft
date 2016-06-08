declare module "uuid-js" {
    export interface UUID {
        toString() : string;
    }
    export function create(version?: number): UUID;
}
