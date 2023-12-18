import { CoreEntity } from '../../base/CoreEntity';
import { IFile } from '../../interface/IFile';

/**
 * # 内置的文件类
 * @author Hamm
 */
export class CoreFileEntity extends CoreEntity implements IFile {
    id!: number;
    url!: string;
}
