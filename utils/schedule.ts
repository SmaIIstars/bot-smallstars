import nodeSchedule, { JobCallback, Job } from "node-schedule";

const { scheduleJob } = nodeSchedule;

class Schedule {
  private _jobs: Job[] = [];
  public get jobs(): Job[] {
    return this._jobs;
  }

  constructor() {}

  add = (name: string, rule: Date | string | number, callback: JobCallback) => {
    if (this._jobs.some((job) => job.name === name)) return false;
    const job = scheduleJob(name, rule, callback);
    this._jobs.push(job);
    return true;
  };

  delete = (name: string) => {
    const job = this._jobs.find((job) => job.name === name);
    job?.cancel();
  };

  get = () => {
    const jobs: { name: string; nextInvocation: Date }[] = [];
    this._jobs.forEach((job, index) => {
      jobs.push({
        name: job.name,
        nextInvocation: job.nextInvocation(),
      });
    });

    return jobs;
  };
}

export const schedule = new Schedule();

export default Schedule;
