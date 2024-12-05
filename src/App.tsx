import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { router } from "./router";

import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        hashed: false,
        token: {
          colorPrimary: "#1DA57A",
        },
      }}
      componentSize="large"
    >
      <AntdApp>
        <ReactQueryProvider>
          <RouterProvider router={router} />
        </ReactQueryProvider>
      </AntdApp>
    </ConfigProvider>
  );
}
