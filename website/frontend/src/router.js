import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
      //Students
    {
      path: "/students",
      alias: "/students",
      name: "students",
      component: () => import("./components/StudentList")
    },
    {
      path: "/students/:id/edit",
      name: "student-edit",
      component: () => import("./components/EditStudent")
    },
    {
      path: "/students/:id",
      name: "student-details",
      component: () => import("./components/Student")
    },
    {
      path: "/new/student",
      name: "addStudent",
      component: () => import("./components/AddStudent")
    },
    //Tools
    {
        path: "/tools",
        alias: "/tools",
        name: "tools",
        component: () => import("./components/ToolList")
      },
      {
        path: "/tools/:id",
        name: "tool-detail",
        component: () => import("./components/Tool")
      },
      {
        path: "/tools/:id/edit",
        name: "tool-edit",
        component: () => import("./components/EditTool")
      },
      {
        path: "/new/tool",
        name: "addTool",
        component: () => import("./components/AddTool")
      },
    //Borrow 
    {
      path: "/borrows",
      alias: "/borrows",
      name: "borrows",
      component: () => import("./components/BorrowList")
    },
    {
      path: "/borrows/:id",
      alias: "/borrowrelated",
      name: "borrowrelated",
      component: () => import("./components/Borrow")
    },
  ]
});