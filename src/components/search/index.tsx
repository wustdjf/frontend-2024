import {
  Select,
  Form,
  FormItem,
  FormGrid,
  FormButtonGroup,
  Submit,
  DatePicker,
} from "@formily/antd";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";

const form = createForm();

export interface ValuesProps {
  status?: string;
  priority?: string;
  createTimeStart?: string;
  createTimeEnd?: string;
  deadlineStart?: string;
  deadlineEnd?: string;
}
export interface IProps {
  onChange: (values: ValuesProps) => void;
}
export const SearchForm = (props: IProps) => (
  <Form
    form={form}
    layout="vertical"
    feedbackLayout="terse"
    onAutoSubmit={console.log}
    onAutoSubmitFailed={console.log}
  >
    <FormGrid maxColumns={3}>
      <Field
        name="status"
        title="状态"
        decorator={[FormItem]}
        component={[
          Select,
          {
            allowClear: true,
          },
        ]}
        dataSource={[
          {
            label: "待处理",
            value: "pending",
          },
          {
            label: "处理中",
            value: "processing",
          },
          {
            label: "已完成",
            value: "completed",
          },
        ]}
      />
      <Field
        name="priority"
        title="优先级"
        decorator={[FormItem]}
        component={[
          Select,
          {
            allowClear: true,
          },
        ]}
        dataSource={[
          {
            label: "低优先级",
            value: "low",
          },
          {
            label: "中优先级",
            value: "medium",
          },
          {
            label: "高优先级",
            value: "high",
          },
        ]}
      />
      <Field
        name="[createTimeStart,createTimeEnd]"
        title="创建时间"
        decorator={[FormItem]}
        component={[
          DatePicker.RangePicker,
          {
            showTime: true,
          },
        ]}
      />
      <Field
        name="[deadlineStart,deadlineEnd]"
        title="截止时间"
        decorator={[FormItem]}
        component={[
          DatePicker.RangePicker,
          {
            showTime: true,
          },
        ]}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={props?.onChange}>查询</Submit>
      </FormButtonGroup.FormItem>
    </FormGrid>
  </Form>
);
