import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { router } from "./router";

import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";

export default function App() {
  return (
    <ConfigProvider locale={zhCN} componentSize="large">
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </ConfigProvider>
  );
}
