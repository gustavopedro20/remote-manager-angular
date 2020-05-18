import { ITask } from '../task.model';
import { IMen } from '../men.mode';
import { IDiskUsage } from '../disk-usage.model';

export interface ITaskMenDiskDTO {
    tasks: ITask[];
    men: IMen;
    diskUsage: IDiskUsage;
}
