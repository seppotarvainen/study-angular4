/**
 * Created by Seppo on 31/08/2017.
 */

export default class Recording {
  userId?: number;
  start: Date;
  end: Date;

  constructor(start?: Date, end?: Date, userId?: number){
    if (start) this.start = start;
    if (end) this.end = end;
    if (userId) this.userId = userId;
  }

  setData(obj: any) {
    this.start = obj.start;
    this.end = obj.end;
    this.userId = obj.userId;
  }

  public static getDuration(start: Date, end: Date): number {
    let s = new Date(start);
    let e = new Date(end);
    return e.getTime() - s.getTime();
  }
}
