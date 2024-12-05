import moment from "moment";

export const StatusMap = {
  pending: "待处理",
  processing: "处理中",
  completed: "已完成",
};
export const statusList = ["pending", "processing", "completed"];

export const PriorityMap = {
  low: "低优先级",
  medium: "中优先级",
  high: "高优先级",
};
export const priorityList = ["low", "medium", "high"];

export const PriorityMapNumber = {
  low: "1",
  medium: "2",
  high: "3",
};

export const randomGen = (range: number) => Math.floor(Math.random() * range);

export const timeFormat = (time: string) =>
  time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : time;
