export const replace = (value: string | undefined):string[] => {
    let rep = value?.replace('{', '')
    rep = rep?.replace('}', '')
    rep = rep?.replace(' ', '');
    const arr = rep?.split(',');
    return arr!;
}