import { Form, Table, Typography } from "antd";
import type { TableProps } from "antd";
import type { SortOrder } from "@/types";
import React, { useEffect, useState } from "react";
import { SearchForm, ValuesProps } from "@/components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import {
  randomGen,
  PriorityMap,
  StatusMap,
  timeFormat,
  PriorityMapNumber,
  statusList,
  priorityList,
} from "@/constant/const";

interface Item {
  id: string;
  title: string;
  status: string;
  priority: string;
  createTime: string;
  deadline: string;
  user: {
    id: string;
    nickname: string;
  };
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    id: i.toString(),
    title: `游戏客服工单 ${i}`,
    status: statusList[randomGen(3)],
    priority: priorityList[randomGen(3)],
    createTime: moment().toString(),
    deadline: moment().add(7, "days").toString(),
    user: {
      id: `user-id-${i.toString()}`,
      nickname: `user-nickname-${i.toString()}`,
    },
  });
}

const MainPage: React.FC = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>(originData);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(originData.length);
  const [status, setStatus] = useState<string>();
  const [priority, setPriority] = useState<string>();
  const [priorityOrder, setPriorityOrder] = useState<string>("descend");

  const fetchData = async (): Promise<{ list: Item[]; total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = originData
          .filter((i) => {
            return statusList.includes(status as string)
              ? i.status === status
              : true;
          })
          .filter((i) => {
            return priorityList.includes(priority as string)
              ? i.priority === priority
              : true;
          })
          .sort((a, b) => {
            const numberA = parseInt(
              PriorityMapNumber[a.priority as keyof typeof PriorityMapNumber]
            );
            const numberB = parseInt(
              PriorityMapNumber[b.priority as keyof typeof PriorityMapNumber]
            );
            return priorityOrder === "descend"
              ? numberA - numberB
              : numberB - numberA;
          });

        const data = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        resolve({ list: data, total: list.length });
      }, 1000);
    });
  };

  useEffect(() => {
    const asyncFun = async () => {
      const { list, total } = await fetchData();
      setData(list);
      setTotal(total);
    };
    asyncFun();
  }, [pageNum, pageSize, status, priority, priorityOrder]);

  const onSearchBack = (values: ValuesProps) => {
    // 其他筛选参数后续完善
    setStatus(values?.status);
    setPriority(values.priority);
  };

  const toDetail = (key: Item["id"]) => {
    navigate(`/detail/${key}`);
  };

  const onTableChange: TableProps<Item>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    if (!Array.isArray(sorter)) {
      setPriorityOrder(sorter.order as string);
    }
  };

  const onPagination = (pageNum: number, size: number) => {
    setPageNum(pageSize !== size ? 1 : pageNum);
    setPageSize(size);
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      width: "15%",
    },
    {
      title: "状态",
      dataIndex: "status",
      width: "15%",
      render: (text: keyof typeof StatusMap) => (text ? StatusMap[text] : ""),
    },
    {
      title: "优先级",
      dataIndex: "priority",
      width: "15%",
      defaultSortOrder: "descend" as SortOrder,
      sorter: true,
      render: (text: keyof typeof PriorityMap) =>
        text ? PriorityMap[text] : "",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: "20%",
      render: (text: string) => (text ? timeFormat(text) : ""),
    },
    {
      title: "截止时间",
      dataIndex: "deadline",
      width: "20%",
      render: (text: string) => (text ? timeFormat(text) : ""),
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        return (
          <Typography.Link onClick={() => toDetail(record.id)}>
            查看详情
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <>
      <SearchForm onChange={onSearchBack} />

      <Form form={form} component={false}>
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={data}
          columns={columns}
          rowClassName={styles["editable-row"]}
          onChange={onTableChange}
          pagination={{
            current: pageNum,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条数据`,
            onChange: onPagination,
          }}
        />
      </Form>
    </>
  );
};

export default MainPage;
