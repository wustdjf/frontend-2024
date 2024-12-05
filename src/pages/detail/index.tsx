import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Input, Upload } from "antd";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import {
  randomGen,
  PriorityMap,
  StatusMap,
  timeFormat,
  statusList,
  priorityList,
} from "@/constant/const";

const { TextArea } = Input;

interface DetailDataProps {
  id: string;
  title: string;
  content: string;
  status: string;
  priority: string;
  createTime: string;
  deadline: string;
  user: {
    id: string;
    nickname: string;
    registerTime: string;
    recentTickets: Array<{
      id: string;
      title: string;
      status: string;
    }>;
  };
  replies: Array<{
    id: string;
    content: string;
    createTime: string;
    operator: {
      id: string;
      name: string;
    };
    images?: string[];
  }>;
}

const originData: DetailDataProps[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    id: i.toString(),
    title: `游戏客服工单 ${i}`,
    content: `游戏客服工单 ${i}内容`,
    status: statusList[randomGen(3)],
    priority: priorityList[randomGen(3)],
    createTime: moment().toString(),
    deadline: moment().add(7, "days").toString(),
    user: {
      id: `user-id-${i.toString()}`,
      nickname: `user-nickname-${i.toString()}`,
      registerTime: moment().toString(),
      recentTickets: new Array(10).fill({
        id: i.toString(),
        title: `游戏客服工单 ${i}`,
        status: statusList[randomGen(3)],
      }),
    },
    replies: new Array(10).fill({
      id: `replies-id-${i.toString()}`,
      content: `游戏客服工单 ${i}内容`,
      createTime: moment().toString(),
      operator: {
        id: `replies-operator-id-${i.toString()}`,
        name: `replies-operator-name-${i.toString()}`,
      },
      images: new Array(10).fill(
        "https://img0.baidu.com/it/u=2931243091,718249849&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1733504400&t=6b0770afecbd15aba90ce2022790e860"
      ),
    }),
  });
}

const DetailPage: React.FC = () => {
  const params = useParams();
  const detailId = params.id as string;

  const [detailData, setDetailData] = useState<DetailDataProps>();

  const fetchData = async (id: string): Promise<DetailDataProps> => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        const data = originData.find((i) => i.id === id);
        if (data) {
          resolve(data);
        } else {
          reject(null);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const asyncFun = async () => {
      const detailData = await fetchData(detailId);
      setDetailData(detailData);
    };
    asyncFun();
  }, []);

  return detailData ? (
    <>
      <h1>工单详情</h1>
      <h2>工单编号: {detailData.id}</h2>
      <h2>工单名称: {detailData.title}</h2>
      <h2>
        工单状态: {StatusMap[detailData.status as keyof typeof StatusMap]}
      </h2>
      <h2>
        工单状态: {PriorityMap[detailData.priority as keyof typeof PriorityMap]}
      </h2>
      <h2>工单内容: {detailData.content}</h2>
      <h2>工单创建时间: {timeFormat(detailData.createTime)}</h2>
      <h2>工单处理截止时间: {timeFormat(detailData.deadline)}</h2>

      <h1>回复工单</h1>
      {/*待完善*/}
      <TextArea placeholder="请输入工单内容" />
      <Upload listType="picture-card">上传图片</Upload>
      <Button>回复</Button>

      <h1>工单回复内容</h1>
      {detailData.replies?.map((i) => {
        return (
          <div className={styles.replyContainer}>
            <h2>回复人: {i.operator.name}</h2>
            <h2>回复内容: {i.content}</h2>
            <h2>回复时间: {timeFormat(i.createTime)}</h2>
            <h2>回复图片: </h2>
            {(i.images || []).map((p) => (
              <img src={p} className={styles.img} />
            ))}
          </div>
        );
      })}
    </>
  ) : null;
};

export default DetailPage;
