/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export declare type Mod = string | {
    [key: string]: any;
};
export declare type Mods = Mod | Mod[];
export declare function createBEM(name: string): (el?: Mods, mods?: Mods) => Mods;
export declare type BEM = ReturnType<typeof createBEM>;
