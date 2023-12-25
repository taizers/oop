import fs from 'fs';

export const deleteFile = (path: string) => {
    if (fs.existsSync(path)) {
        return fs.unlinkSync(path);
    }
};
