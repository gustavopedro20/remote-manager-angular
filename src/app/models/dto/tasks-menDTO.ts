import { ITask } from '../task.model';
import { IMen } from '../men.mode';

export interface ITaskMen {
    tasks: ITask[];
    men: IMen;
}
